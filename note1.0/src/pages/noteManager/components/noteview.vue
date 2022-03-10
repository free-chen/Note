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
      <el-button plain @click="stopsharethisnote" style="margin-left: 10px;"
        >取消分享</el-button
      >
      <el-button style="left: 0px;" @click="copy(sendshareId)"
        >分享ID：{{ sendshareId }}</el-button
      >

      <div class="separator"><div class="line"></div></div>
    </div>
    <div style="margin-top: 10px;height: 80%;">
      <div v-html="title" class="vintage"></div>
      <div v-html="htmlContent"></div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <span>
        <el-input v-model="title" placeholder="标题"></el-input>
        <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
        <br />
        <el-button type="primary" @click="snbutton">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js"></script>
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
      shareId: "",
      showshareId: "",
    };
  },
  props: {
    sends: {
      type: String,
      default: "",
    },
    sendshareId: {
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
      console.log(this.sends);
      console.log("viewshare" + this.sendshareId);
      console.log("sdadasd" + this.sendshareId);
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
    },
    stopsharethisnote() {
      request({
        url: "/internal/share/" + this.sendshareId,
        method: "delete",
      })
        .then((res) => {
          console.log(res);
          alert("取消分享成功");
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(() => {
        this.$router.push("/noteManager");
      }, 500);
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
    copy(data) {
      let url = data;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: "复制成功",
        type: "success",
      });
      oInput.remove();
    },
  },
  watch: {
    sends() {
      this.furrysom();
      var traget = document.getElementById("modifypart");
      traget.style.display = "";
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
</style>
