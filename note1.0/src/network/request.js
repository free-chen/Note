import axiox from "axios";

export default function request(option) {
  const token = window.sessionStorage.getItem("Token");
  //   if (token == null) {
  //     this.$router.push({ path: "/login" });
  //   }

  return new Promise((resolve, reject) => {
    // 创建axios的实例
    const instance = axiox.create({
      baseURL: "http://120.76.128.222:8004",
      //   timeout: 60 * 60 * 1000,
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    // 传入对象进行网络请求
    instance(option)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
    // 请求拦截器;
    instance.interceptors.request.use(
      function(request) {
        console.log("itwork12");
        return request;
      },
      (error) => {
        console.log(error);
      }
    );
    //回复拦截器
    instance.interceptors.response.use(
      function(response) {
        console.log("itswork3");
        // 对响应数据做点什么
        return response;
      },
      function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  });
}
