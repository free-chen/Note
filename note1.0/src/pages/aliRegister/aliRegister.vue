<template>
  <div>
    <div
      style="width: 100px;height: 100px;position: absolute;left: 50%;top: 10%;margin: -50px 0 0 -50px;"
    >
      <img src="../../../public/NewNoteLogo.jpg" width="100px" height="100px" />
    </div>
    <div
      style="height: 500px;width: 500px; position: absolute;left: 50%;top: 50%;margin: -250px 0 0 -250px;"
    >
      <el-tabs
        v-model="activeName"
        type="border-card"
        @tab-click="handleClick"
        stretch="false"
      >
        <el-form :inline="true" :model="formInline">
          <el-form-item>
            <el-input
              v-model="inputusername"
              placeholder="请输入用户名"
              style="display:inline;"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="checkeusername"
              style="height: 40px;
    width: 100%;"
              >是否能注册该用户名</el-button
            >
          </el-form-item>
        </el-form>
        <br />
        <el-input
          show-password
          v-model="inputpassword"
          placeholder="请输入密码"
        ></el-input>
        <br />
        <br />
        <el-button
          type="primary"
          @click="subregister"
          style="height: 50px;
    width: 100%;
    background-color: #deb887;
    margin-top: 17px;
    background: #2dbe61;
    border: 1px solid #1fae52;
    border-radius: 6px;
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    cursor: pointer;"
          >注 册</el-button
        >
      </el-tabs>
    </div>
  </div>
</template>

<script>
import request from "@/network/request";
import axios from "axios";

export default {
  component: {},
  data() {
    return {
      client_id: "web",
      client_secret: "web",
      grant_type: "password",
      inputemail: "",
      inputcheckcode: "",
      inputusername: "",
      inputpassword: "",
      dialogVisible: false,
      json: {
        checkCode: this.inputcheckcode,
        email: this.inputemail,
        password: this.inputpassword,
        username: this.inputusername,
      },
      loginUsername: "",
      loginPassword: "",
      radio: "1",
      activeName: "first",
      showRentPrise: false,
      rememberpassword: false,
      accountInfo: "",
      aliId: "",

      // client_id: 'web',
      // client_secret: 'web',
      // grant_type: 'password'
    };
  },
  mounted() {
    this.getaliid();
  },
  methods: {
    getaliid() {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == "id") {
          this.aliId = pair[1];
        }
      }
    },
    loginbutton() {
      request({
        url:
          "/auth/oauth/token?client_id=web&client_secret=web&grant_type=password&username=" +
          this.inputusername +
          "&password=" +
          this.inputpassword,
        method: "post",
      })
        .then((res) => {
          console.log(res);
          window.sessionStorage.setItem("Token", res.data.access_token);
          // $window.seesionStorage.accessToken = this.user_token
          setTimeout(() => {
            if (sessionStorage.getItem("Token")) {
              this.$router.push("/userindex");
            }
          }, 500);
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkeusername() {
      var that = this;
      axios
        .get(
          "http://120.76.128.222:8004/auth/user/username/" + this.inputusername
        )
        .then(function(response) {
          console.log(response.data.data);
          if (response.data.data == true) {
            that.$message({
              message: "该用户名可注册",
              type: "success",
            });
          } else {
            that.$message.error("该用户名不可注册");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    subregister() {
      console.log(this.aliId);
      var that = this;
      axios
        .post("http://120.76.128.222:8004/auth/user/alipay", {
          password: this.inputpassword,
          username: this.inputusername,
          aliUserId: this.aliId,
        })
        .then((response) => {
          console.log(response);
          console.log(response.data.data);
          if (response.data.code == 10086) {
            that.$message.error("支付宝ID为空");
          } else {
            that.$message({
              message: "注册成功",
              type: "success",
            });
            this.router.go(0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        this.loginbutton();
      }, 500);
    },
  },
};
</script>

<style>
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
}
</style>
