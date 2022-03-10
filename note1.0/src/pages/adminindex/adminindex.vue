<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="navIndex" style="height: 940px;">
          <el-menu-item index="usercontroller" @click="Link('usercontroller')">
            <i class="el-icon-edit"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>

          <el-menu-item index="actionData" @click="Link('actionData')">
            <i class="el-icon-edit"></i>
            <span slot="title">查看操作</span>
          </el-menu-item>

          <el-menu-item index="dataAnalyse" @click="Link('dataAnalyse')">
            <i class="el-icon-folder-opened"></i>
            <span slot="title">数据分析</span>
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
              style="width: 600px;margin-top: 420px;margin-left: -200px;"
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
      centerDialogVisible: false,
    };
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
