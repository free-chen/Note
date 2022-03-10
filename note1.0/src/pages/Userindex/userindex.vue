<template>
  <div id="app" style="height: 100%;">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="navIndex" style="height: 940px;">
          <el-menu-item index="write" @click="Link('write')">
            <i class="el-icon-edit"></i>
            <span slot="title">新建笔记</span>
          </el-menu-item>

          <el-menu-item index="files" @click="Link('files')">
            <i class="el-icon-folder-opened"></i>
            <span slot="title">最新笔记</span>
          </el-menu-item>

          <el-menu-item index="noteManager" @click="Link('noteManager')">
            <i class="el-icon-share"></i>
            <span slot="title">分享笔记</span>
          </el-menu-item>

          <el-menu-item
            index="depandenceGraph"
            @click="Link('depandenceGraph')"
          >
            <i class="el-icon-rank"></i>
            <span slot="title">关系图</span>
          </el-menu-item>

          <div
            style="border-top: 1px solid #e1e1e1;position: absolute;bottom: 0;left: 0;right: 0;padding: 17px;"
          >
            <div class="l-header" @click="centerDialogVisible = true">
              <slot name="left">
                <img
                  id="left"
                  slot="left"
                  src="../../../public/NewNoteLogo.jpg"
                  alt=""
                  width="40px"
                  height="40px"
                />
              </slot>
            </div>
            <el-dialog
              :visible.sync="centerDialogVisible"
              :showClose="false"
              width="30%"
              style="width: 600px;margin-top: 430px;margin-left: -200px;border-radius: 2px;"
            >
              <div style="height: 170px;">
                <img
                  src="../../../public/NewNoteLogo.jpg"
                  height="50px"
                  width="50px"
                />
                <p>888888888</p>
                <el-button @click="exitlogin">退出登录</el-button>
              </div>
            </el-dialog>
          </div>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      rate: null,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      centerDialogVisible: false,
    };
  },
  mounted() {
    this.Link("files");
  },
  methods: {
    Link(path) {
      this.$router.push(path);
    },
    exitlogin() {
      this.$router.push({ path: "/login" });
    },
  },
  computed: {
    navIndex() {
      return this.$route.name;
    },
  },
};
</script>

<style>
.el-header {
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
}
.header-operations {
  display: inline-block;
  text-align: right;
  padding-right: 30px;
  height: 100%;
}
.header-opacity {
  opacity: 0.7;
}
</style>
