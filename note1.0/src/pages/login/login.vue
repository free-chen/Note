<template>
  <div>
    <div
      style="width: 100px;height: 100px;position: absolute;left: 50%;top: 10%;margin: -50px 0 0 -50px;"
    >
      <img src="../../../public/NewNoteLogo.jpg" width="100px" height="100px" border-radius="10px" />
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
        <el-tab-pane label="登录" name="first">
          <br />
          <div id="content">
            <div class="login-header"></div>
            <form>
              <span class="icon icon-user"></span>
              <!-- <div> 
                  <img src="../../../public/user.png" />
                  
              </div> -->
              <el-input
                v-model="loginUsername"
                placeholder="请输入用户名">
              </el-input>
              <br />
              <br />
              <span class="icon icon-password"></span>
              <el-input
                show-password
                v-model="loginPassword"
                placeholder="请输入密码"
              ></el-input>
            </form>
            <br />
            <el-form :inline="true" :model="formInline">
              <el-form-item>
                <el-switch
                  v-model="radio"
                  active-color="#666666"
                  inactive-color="#666666"
                  active-value="1"
                  inactive-value="2"
                  active-text="用户"
                  inactive-text="管理员"
                >
                </el-switch>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="rememberpassword" style="margin-left:5%;"
                  >记住密码</el-checkbox
                >
              </el-form-item>
              <el-form-item>
                <div
                  v-show="showRentPrise"
                  style="color: red;margin-left: 20px;"
                >
                  &nbsp;&nbsp;密码错误
                </div>
              </el-form-item>
            </el-form>

            <div class="login-button-box">
              <el-button
                @click.native="loginbutton"
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
                >登录
                </el-button>
            </div>
            <div class="separator">
              <div class="line"></div>
              <p class="text">或</p>
              <div class="line"></div>
            </div>
            <div class="login-button-box">
              <el-button
                style="height: 50px;
                        width: 100%;
                        background-color: #3B9BFF;
                        margin-top: 17px;
                        background: #0a83b3;
                        border: 1px solid #186ef0;
                        border-radius: 6px;
                        font-size: 14px;
                        color: #fff;
                        margin-bottom: 10px;
                        cursor: pointer;"
                @click="JumpToAli"
                >使用支付宝登陆</el-button
              >
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="注册" name="second">
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
          <el-input v-model="inputemail" placeholder="请输入邮箱"></el-input>
          <br />

          <el-button
            @click="checkemail"
            style="height: 40px;
    width: 100%;
    margin-top: 17px;
    border-radius: 6px;
    font-size: 14px;
    margin-bottom: 17px;
    cursor: pointer;"
            >发送验证码</el-button
          >
          <br />
          <el-input
            show-password
            v-model="inputpassword"
            placeholder="请输入密码"
          ></el-input>
          <br />
          <br />
          <el-input
            v-model="inputcheckcode"
            placeholder="请输入验证码"
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
        </el-tab-pane>
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

      // client_id: 'web',
      // client_secret: 'web',
      // grant_type: 'password'
    };
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    loginbutton() {
      axios
        .post(
          "http://120.76.128.222:8004/auth/oauth/token?client_id=web&client_secret=web&grant_type=password&username=" +
            this.loginUsername +
            "&password=" +
            this.loginPassword
        )
        .then((response) => {
          console.log(response);
          window.sessionStorage.setItem("Token", response.data.access_token);
          setTimeout(() => {
            this.check();
          }, 500);
          // $window.seesionStorage.accessToken = this.user_token
        })
        .catch((error) => {
          console.log(error);
          this.showRentPrise = true;
        });
    },
    check() {
      var that = this;
      if (this.rememberpassword == true) {
        this.setCookie(
          this.loginUsername,
          this.loginPassword,
          this.rememberpassword,
          7
        );
      } else {
        this.clearCookie();
      }
      if (this.radio == "1") {
        if (sessionStorage.getItem("Token")) {
          this.$router.push("/userindex");
        } else {
          alert("idk");
        }
      } else if (this.radio == "2") {
        request({
          url: "/auth/user/userInfo",
          method: "get",
        })
          .then((res) => {
            this.accountInfo = res.data.data.roles;
            if (JSON.stringify(this.accountInfo).indexOf("管理员") > -1) {
              if (sessionStorage.getItem("Token")) {
                this.$router.push("/adminindex");
              }
            } else {
              that.$message.error("您没有管理员权限");
            }
          })
          .catch((err) => {
            console.log(err);
            this.showRentPrise = true;
          });
      }
    },
    setCookie(c_name, c_pwd, c_rem, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "remenber" + "=" + c_rem + ";path=/;expires=" + exdate.toGMTString();
    },
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.loginUsername = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.loginPassword = arr2[1];
          } else if (arr2[0] == "remenber") {
            this.rememberpassword = arr2[1];
          }
        }
      }
    },
    clearCookie() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    sendemail() {
      axios
        .get("http://120.76.128.222:8004/auth/email/" + this.inputemail)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    checkemail() {
      var that = this;
      axios
        .get("http://120.76.128.222:8004/auth/user/email/" + this.inputemail)
        .then((response) => {
          console.log(response.data.data);
          if (response.data.data == true) {
            this.sendemail();
            that.$message({
              message: "邮件已发送",
              type: "success",
            });
          } else {
            that.$message.error("该邮箱已被注册");
          }
        })
        .catch((error) => {
          console.log(error);
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
      var that = this;
      axios
        .post("http://120.76.128.222:8004//auth/user", {
          checkCode: this.inputcheckcode,
          email: this.inputemail,
          password: this.inputpassword,
          username: this.inputusername,
        })
        .then((response) => {
          console.log(response);
          console.log(response.data.data);
          that.$message({
            message: "注册成功",
            type: "success",
          });
          this.router.go(0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    JumpToAli() {
      window.location.href =
        "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021001195608145&scope=auth_user&redirect_uri=http%3A%2F%2F120.76.128.222%3A8004%2Fauth%2Falipay%2Fweb";
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
