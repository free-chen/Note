<template>
  <div>
    <div id="modifypart" style="display:none">
      <el-button type="success" @click="rewrite" style="margin-right: 10px;"
        >编辑</el-button
      >
      <!-- <el-button type="danger" @click="deletethisnote">删除</el-button> -->
      <el-popover placement="top" width="160" v-model="visible">
        <p>确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false"
            >取消</el-button
          >
          <el-button type="primary" size="mini" @click="deletethisnote"
            >确定</el-button
          >
        </div>
        <el-button slot="reference" type="danger">删除</el-button>
      </el-popover>
      <el-button plain @click="sharethisnote" style="margin-left: 10px;"
        >分享</el-button
      >
      <div class="separator" style="margin-bottom: 5px;">
        <div class="line"></div>
      </div>
    </div>
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag.tagName }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ New Tag</el-button
    >
    <div class="separator" style="margin-top: 5px;">
      <div class="line"></div>
    </div>
    <div style="margin-top: 10px;height: 80%;">
      <div v-html="title" class="vintage"></div>
      <div v-html="htmlContent"></div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <span>
        <el-input v-model="title" placeholder="y标题"></el-input>
        <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
        <br />
        <el-button type="primary" @click="snbutton">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/network/request";
import VueUeditorWrap from "vue-ueditor-wrap";

export default {
  data() {
    return {
      htmlContent: "",
      title: "",
      visible: false,
      myConfig: {
        UEDITOR_HOME_URL: "/UEditor/",
        serverUrl: "http://35.201.165.105:8000/controller.php",
        initialFrameHeight: 750,
        initialFrameWidth: "100%",
      },
      msg: "",
      dialogVisible: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      pTags: [],
    };
  },
  props: {
    sends: {
      type: String,
      default: "",
    },
  },
  components: {
    VueUeditorWrap,
    // markdown
  },
  methods: {
    furrysom() {
      this.dynamicTags = [];
      console.log(this.sends);
      request({
        url: "/internal/note/" + this.sends,
        method: "get",
      })
        .then((res) => {
          console.log(res);
          this.htmlContent = res.data.data.htmlContent;
          this.title = res.data.data.title;
          // $window.seesionStorage.accessToken = this.user_token
        })
        .catch((err) => {
          console.log(err);
        });
      request({
        url: "/internal/note/tags/" + this.sends,
        method: "get",
      })
        .then((res) => {
          console.log(res);
          this.pTags = res.data.data.tags;
          console.log(this.pTags);
          for (var i in this.pTags) {
            this.dynamicTags.push(this.pTags[i]);
          }
          console.log(this.dynamicTags);
          // $window.seesionStorage.accessToken = this.user_token
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sharethisnote() {
      request({
        url: "/internal/share",
        method: "post",
        data: {
          noteId: this.sends,
        },
      })
        .then((res) => {
          this.$notify({
            title: "提示",
            message: "分享ID是" + res.data.data,
            duration: 0,
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletethisnote() {
      request({
        url: "/internal/note/" + this.sends,
        method: "delete",
      })
        .then((res) => {
          console.log(res);
          alert(this.sends + "删除成功");
          // $window.seesionStorage.accessToken = this.user_token
        })
        .catch((err) => {
          console.log(err);
        });
      this.$router.go(0);
    },
    rewrite() {
      this.dialogVisible = true;
      this.msg = this.htmlContent;
    },
    snbutton() {
      request({
        url: "/internal/note/",
        method: "put",
        data: {
          htmlContent: this.msg,
          noteId: this.sends,
          title: this.title,
        },
      })
        .then((res) => {
          console.log(res);
          // $window.seesionStorage.accessToken = this.user_token
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogVisible = false;
      setTimeout(() => {
        this.furrysom();
      }, 100);
    },
    handleClose(tag) {
      console.log(tag);
      request({
        url: "/internal/note/" + tag.tagId + "/" + this.sends,
        method: "delete",
      })
        .then((res) => {
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        request({
          url:
            "/internal/note/tag/?tagName=" +
            inputValue +
            "&noteId=" +
            this.sends,
          method: "post",
        })
          .then((res) => {
            let inputTags = {
              tagName: inputValue,
              tagId: res.data.tagId,
            };
            this.dynamicTags.push(inputTags);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
  watch: {
    sends() {
      this.furrysom();
      var traget = document.getElementById("modifypart");
      traget.style.display = "";
      this.dynamicTags = [];
    },
  },
};
</script>

<style>
.vintage {
  font-weight: bold;
  text-align: center;
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
}
.separator {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
}
.separator .line {
  -webkit-box-flex: 1;
  -ms-flex: auto;
  flex: auto;
  height: 1px;
  background: #eee;
  margin-top: 20px;
}
/* .footer-over {
position: relative;
z-index: 10;
}
.site-footer {
z-index: 0;
} */
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
