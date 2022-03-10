<template>
  <div id="app" style="height: 900px;">
    <el-input
      v-model="inputtitle"
      placeholder="标题"
      style="margin-bottom: 5px;"
    ></el-input>

    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
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

    <!-- <vue-ueditor-wrap
      v-model="msg"
      :config="myConfig"
      style="margin-top: 5px;"
    ></vue-ueditor-wrap> -->

    <div>
        <TinymceEditor  upload-url="http://baidu/uploadImg" v-model="value"></TinymceEditor>
    </div>



    <p>
      <!-- <el-button type="primary" @click="showOne();">获取编辑器内容</el-button> -->
      <el-button type="primary" @click="saveNote()">保存笔记</el-button>
    </p>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import TinymceEditor from './tinymce-editor/index.vue';
export default{
    name:"app",
    data(){
        return{
            value: 'New Content'
        }
    },

    components:{
        TinymceEditor,
    }
}


// import VueUeditorWrap from "vue-ueditor-wrap"; // ES6 Module
// import request from "@/network/request";
// import axios from "axios";

// export default {
//   name: "app",
//   components: {
//     VueUeditorWrap,
//   },
//   data() {
//     return {
//       // myConfig: {
//       //     // 如果需要上传功能,找后端小伙伴要服务器接口地址
//       //     serverUrl: this.$config.baseUrl + 'ueditor/ueditorConfig',
//       //     // serverUrl: 'http://localhost:8080/ueditor/ueditorConfig',
//       //     // 你的UEditor资源存放的路径,相对于打包后的index.html
//       //     UEDITOR_HOME_URL: '/UEditor/',
//       //     // 编辑器不自动被内容撑高
//       //     autoHeightEnabled: false,
//       //     // 工具栏是否可以浮动
//       //     autoFloatEnabled: false,
//       //     // 初始容器高度
//       //     initialFrameHeight: 340,
//       //     // 初始容器宽度
//       //     initialFrameWidth: '100%',
//       //     // 关闭自动保存
//       //     enableAutoSave: true
//       //   }
//       msg: "",
//       msgcontent: "",
//       myConfig: {
//         UEDITOR_HOME_URL: "/UEditor/",
//         serverUrl: "http://35.201.165.105:8000/controller.php",
//         initialFrameHeight: 750,
//         initialFrameWidth: "100%",
//       },
//       inputtitle: "",
//       json: {
//         htmlContent: this.msg,
//         content: this.msg,
//         title: this.inputtitle,
//       },
//       dynamicTags: [],
//       inputVisible: false,
//       inputValue: "",
//       tagsCount: 0,
//       resNoteId: "",
//       resTag: "",
//     };
//   },
//   created: {},
//   mounted: {},
//   methods: {
//     showOne() {
//       alert(this.msg);
//     },
//     saveNote() {
//       this.msgcontent = this.msg
//         .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
//         .replace(/<[^>]+?>/g, "")
//         .replace(/\s+/g, "")
//         .replace(/ /g, "")
//         .replace(/>/g, "");
//       request({
//         url: "/internal/note",
//         method: "post",
//         data: {
//           htmlContent: this.msg,
//           content: this.msgcontent,
//           title: this.inputtitle,
//         },
//       })
//         .then((res) => {
//           console.log(res);
//           this.resNoteId = res.data.data.noteId;
//           console.log(this.resNoteId);
//           // $window.seesionStorage.accessToken = this.user_token
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       setTimeout(() => {
//         this.addTag();
//         this.createRelation();
//         alert("创建笔记成功");
//       }, 100);
//       setTimeout(() => {
//         this.$router.push("/files");
//       }, 500);
//     },
//     createRelation() {
//       axios
//         .get("http://118.178.58.95:8080/newword?id=" + this.resNoteId)
//         .then((response) => {
//           this.resTag = response.data;
//           axios
//             .get("http://118.178.58.95:8080/addNode?id=" + this.resNoteId)
//             .then((response) => {
//               console.log(response);
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//           request({
//             url:
//               "/internal/note/tag?noteId=" +
//               this.resNoteId +
//               "&tagName=" +
//               this.resTag,
//             method: "post",
//           })
//             .then((res) => {
//               console.log(res);
//               // $window.seesionStorage.accessToken = this.user_token
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     },
//     addTag() {
//       for (var i in this.dynamicTags) {
//         request({
//           url:
//             "/internal/note/tag?noteId=" +
//             this.resNoteId +
//             "&tagName=" +
//             this.dynamicTags[i],
//           method: "post",
//         })
//           .then((res) => {
//             console.log(res);
//             // $window.seesionStorage.accessToken = this.user_token
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     },
//     handleClose(tag) {
//       this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
//       this.tagsCount--;
//     },

//     showInput() {
//       this.inputVisible = true;
//       this.$nextTick(() => {
//         this.$refs.saveTagInput.$refs.input.focus();
//       });
//     },

//     handleInputConfirm() {
//       let inputValue = this.inputValue;
//       if (inputValue) {
//         this.dynamicTags.push(inputValue);
//         this.tagsCount++;
//       }
//       this.inputVisible = false;
//       this.inputValue = "";
//     },
//   },
// };
</script>

<style>
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
