<template>
  <el-table :data="userList" stripe style="width: 100%">
    <el-table-column prop="userId" label="userid" width="210">
    </el-table-column>
    <el-table-column prop="username" label="username" width="180">
    </el-table-column>
    <el-table-column prop="gmtCreate" label="createtime" width="210">
    </el-table-column>
    <el-table-column prop="email" label="email"> </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <!-- <el-button type="primary" size="min" plain @click="edit(scope.row)">编辑</el-button> -->
        <el-button type="danger" size="min" plain @click="ban(scope.row.userId)"
          >封禁</el-button
        >
        <el-button
          type="danger"
          size="min"
          plain
          @click="removeban(scope.row.userId)"
          >解禁</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import request from "@/network/request";
export default {
  data() {
    return {
      userList: [],
      senduserId: "",
    };
  },
  created() {
    this.createdload();
  },
  methods: {
    createdload() {
      request({
        url: "/auth/user/1/10",
        method: "get",
      })
        .then((res) => {
          this.userList = res.data.data.users;
          console.log(this.userList);
          // $window.seesionStorage.accessToken = this.user_token
          for (var p in this.noteList) {
            //遍历json数组时，这么写p为索引，0,1

            this.senduserId = this.noteList[p].userId;
          }
          console.log(this.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ban(userid) {
      var that = this;
      request({
        url: "/auth/user/ban/" + userid,
        method: "delete",
      })
        .then((res) => {
          that.$message({
            message: "封禁成功",
            type: "success",
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeban(userid) {
      var that = this;
      request({
        url: "/auth/user/ban/" + userid,
        method: "put",
      })
        .then((res) => {
          that.$message({
            message: "解封成功",
            type: "success",
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
