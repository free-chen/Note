<template>
  <div id="categories">
    <el-table :data="dataList" stripe height="900">
      <el-table-column prop="userId" label="用户ID"> </el-table-column>
      <el-table-column prop="description" label="操作"> </el-table-column>
      <el-table-column prop="gmtCreate" label="时间"> </el-table-column>
      <el-table-column prop="ipAddress" label="IP地址"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/network/request";
// import request from "@/network/request.js"
// import addshareNote from "./addsharenote.vue"
export default {
  data: function() {
    return {
      pageNum: "1",
      dataList: [],
    };
  },
  components: {},
  created() {
    this.createdload();
  },
  methods: {
    createdload() {
      request({
        url: "/internal/admin/statics/page/1/100",
        method: "get",
      })
        .then((res) => {
          console.log(res);
          this.dataList = res.data.data.logs;
          for (var p in this.dataList) {
            //遍历json数组时，这么写p为索引，0,1
            console.log(this.dataList[p].userId + this.dataList[p].description);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkinformation() {},
  },
};
</script>

<style>
.test-scroller {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  color: #fff;
  height: 70%;
  overflow: scroll;
}
</style>
