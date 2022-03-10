<template>
  <div id="categories">
    <div id="cat-header">
      <h2><i class="bookmark icon"></i>SHARE-NOTE</h2>
    </div>
    <div class="container test-scroller" style="margin-top:-100px">
      <li
        class="item_first"
        v-for="(item, index) in noteList"
        :key="index"
        style="list-style-type:none;"
      >
        <div class="item">
          <el-card
            class="box-card"
            @click.native="checkItem(item.noteId, item.shareId)"
            style="height:75px;font-size: small;margin-top:-10px"
          >
            <p style="margin-top: 0px;font-size: medium;">{{ item.title }}</p>
            <p style="margin-top: -10px;">{{ item.gmtCreate }}</p>
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
      pageNum: "1",
      sendtofathershareId: "",
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
    NextPage() {
      this.pageNum++;
      this.createdload();
      console.log(this.pageNum);
    },
    LastPage() {
      if (this.pageNum != 1) {
        this.pageNum--;
        this.createdload();
      } else {
        alert("这是第一页！");
      }
    },
    load() {
      this.count += 2;
    },
    snbutton() {
      this.dialogVisible = false;
      console.log(this.inshareId);
      request({
        url: "/internal/share/" + this.inshareId,
        method: "get",
      })
        .then((res) => {
          console.log(res);
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
          this.tagsd = res;
          console.log(res);
          for (var p in this.tagsd) {
            //遍历json数组时，这么写p为索引，0,1
            this.options.push(this.tagsd[p]);
            // this.options[p].label = this.tagsd[p].gmtCreate
          }
          console.log(this.options);
          // $window.seesionStorage.accessToken = this.user_token
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createdload() {
      request({
        url: "/internal/share",
        method: "get",
      })
        .then((res) => {
          console.log(res);
          this.noteList = res.data.data;
          for (var p in this.noteList) {
            //遍历json数组时，这么写p为索引，0,1
            console.log(this.noteList[p].noteId);
          }
          console.log(this.noteList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkItem(index, indexshareId) {
      this.sendtofathernoteID = index;
      this.sendtofathershareId = indexshareId;
      this.$emit("send", index);
      this.$emit("sendshareIds", indexshareId);
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
  overflow-scrolling: touch;
  color: #fff;
  height: 70%;
  overflow: scroll;
  padding-top: 20px;
}
</style>
