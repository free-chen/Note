<template>
  <div id="categories">
    <div id="cat-header">
      <h2><i class="bookmark icon"></i>NOTE</h2>
      <img
        src="../../../../public/add.png"
        @click="dialogVisible = true"
        style="width: 30px;height: 30px;right: 0px;"
      />
      <!-- <el-button type="success" @click="dialogVisible = true">获取分享笔记</el-button> -->

      <!-- <el-button @click="searchNote">ID查找笔记</el-button> -->
      <el-dialog
        title="输入分享笔记ID"
        :visible.sync="dialogVisible"
        width="500px"
        :showClose="false"
      >
        <el-input v-model="inshareId" placeholder="请输入分享笔记Id"></el-input>
        <br />
        <el-button
          @click="dialogVisible = false"
          style="height: 40px;
                  width: 40%;
                  margin-top: 17px;
                  border-radius: 6px;
                  font-size: 14px;
                  margin-bottom: 17px;
                  cursor: pointer;
                  margin-left: 5%;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="snbutton"
          style="height: 40px;
                  width: 40%;
                  margin-top: 17px;
                  border-radius: 6px;
                  font-size: 14px;
                  margin-bottom: 17px;
                  cursor: pointer;
                  margin-left: 5%;"
          >确 定</el-button
        >
      </el-dialog>

      <el-select
        v-model="tagvalue"
        multiple
        filterable
        allow-create
        clearable
        default-first-option
        placeholder="请选择文章标签"
        style="margin-top: 10px;"
        @change="selectTag"
      >
        <el-option
          v-for="item in options"
          :key="item.tagName"
          :label="item.tagName"
          :value="item.tagName"
          style="max-height: 30px;"
        >
        </el-option>
      </el-select>
    </div>
    <div class="container test-scroller" style="margin-top: -100px;">
      <li
        class="item_first"
        v-for="(item, index) in noteList"
        :key="index"
        style="list-style-type:none;"
      >
        <div class="item">
          <el-card
            class="box-card"
            @click.native="checkItem(item.noteId)"
            style="height:75px;font-size: small;margin-top:-10px"
          >
            <p style="margin-top: 0px;font-size: medium;">{{ item.title }}</p>
            <p style="margin-top: -10px;">{{ item.gmtModified }}</p>
          </el-card>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import request from "@/network/request";
// import request from "@/network/request.js"
// import addshareNote from "./addsharenote.vue"
export default {
  data: function() {
    return {
      dialogVisible: false,
      currentPage2: 1,
      count: 0,
      searchId: "",
      keywords: [],
      tagsd: [],
      options: [],
      tagvalue: [],
      tagsId: [],
      tags: [],
      noteList: [],
      tagsNote: [],
      isOpenItem: [], //控制每级面板的打开与折叠
      isSelectAll: [], //控制每级面板的选中状态
      sendtofathernoteID: "",
      inshareId: "",
      tagList: [],
    };
  },
  components: {},
  created() {
    this.createdlog();
    this.createdload();
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum == val;
      this.createdload();
    },
    snbutton() {
      this.dialogVisible = false;
      console.log(this.inshareId);
      request({
        url: "/internal/share/note?shareId=" + this.inshareId,
        method: "post",
      })
        .then((res) => {
          console.log(res);
          this.$router.go(0);
          // $window.seesionStorage.accessToken = this.user_token
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createdlog() {
      request({
        url: "/internal/tag",
        method: "get",
      })
        .then((res) => {
          this.tagsd = res.data.data;
          for (var p in this.tagsd) {
            //遍历json数组时，这么写p为索引，0,1
            this.options.push(this.tagsd[p]);
            this.tagList.push(this.tagsd[p].tagName);
            // this.options[p].label = this.tagsd[p].gmtCreate
          }
          console.log(this.options);
          console.log(this.tagList);
          // $window.seesionStorage.accessToken = this.user_token
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createdload() {
      request({
        url: "/internal/note/page/1/100",
        method: "get",
      })
        .then((res) => {
          console.log(res);
          this.noteList = res.data.data.notes;
          for (var p in this.noteList) {
            //遍历json数组时，这么写p为索引，0,1
            console.log(this.noteList[p].noteId);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkItem(index) {
      this.sendtofathernoteID = index;
      this.$emit("send", index);
    },
    selectTag() {
      if (this.tagvalue.length == 0) {
        this.createdload();
      } else {
        request({
          url: "/internal/note/tags/1/8",
          method: "post",
          data: {
            tags: this.tagvalue,
          },
        })
          .then((res) => {
            console.log(res);
            this.noteList = res.data.data.notes;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style>
.el-card {
  border-radius: 0px;
}

.el-card__body {
  padding: 0px;
}

#categories {
  background-color: #ffffff;
  top: 0;
  bottom: 0;
  left: 0;
  width: 299px;
  height: 100%;
  overflow: hidden;
  color: #8f9497;
}

#categories div.list {
  margin-left: 30px;
  font-family: "Raleway", sans-serif;
}

#categories .item {
  padding-bottom: 7px !important;
}

#categories h2 {
  margin-top: 20px;
  margin-left: 15px;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size: 14px;
  text-transform: uppercase;
}

#categories button {
  bottom: 15px;
  right: 15px;
}

#cat-header {
  height: 200px;
}

#cat-header h2 {
  font-family: "Raleway", sans-serif !important;
  font-weight: 300;
  font-size: 20px;
  text-transform: uppercase;
  bottom: 10px;
  left: 15px;
}

#categories h2 .bookmark.icon,
#categories h2 .add.icon {
  color: #87568d;
}

.right-float {
  float: right;
}

.selected {
  color: #87568d;
}

.clickable {
  opacity: 1;
  -webkit-transition: opacity 0.25s ease-in-out;
  transition: opacity 0.25s ease-in-out;
}

.container {
  margin: 10px;
}

.container .item span {
  color: #727272;
}

.container .item i {
  color: #ffffff;
}
.test-scroller {
  -webkit-overflow-scrolling: touch;
  color: #fff;
  height: 70%;
  overflow: scroll;
  padding-top: 20px;
}
</style>
