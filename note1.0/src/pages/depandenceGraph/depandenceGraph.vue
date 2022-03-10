<template>
  <div>
    <div style="height:calc(100vh - 50px);">
      <SeeksRelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
      />
    </div>
    <el-dialog title="爬取链接" :visible.sync="dialogTableVisible">
      <el-table :data="reshttp">
        <el-table-column property="http_name" label="内容"></el-table-column>
        <el-table-column label="地址">
          <template slot-scope="scope">
            <a :href="scope.row.http_web" target="_blank" class="buttonText">
              {{ scope.row.http_web }}</a
            >
          </template></el-table-column
        >
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import SeeksRelationGraph from "relation-graph";
export default {
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        defaultNodeBorderWidth: 0,
        // 这里可以参考"Graph 图谱"中的参数进行设置
      },
      graph_json_data: {
        nodes: [],
        links: [],
        rootId: "1294923428070989825",
      },
      reshttp: [],
      dialogTableVisible: false,
      gridData: [],
    };
  },
  components: { SeeksRelationGraph },
  mounted() {
    this.getRelationShip();
  },
  methods: {
    showSeeksGraph() {
      this.$refs.seeksRelationGraph.setJsonData(this.graph_json_data, () => {});
    },
    onNodeClick(nodeObject) {
      this.reshttp = [];
      console.log("onNodeClick:", nodeObject.id);
      axios
        .get("http://118.178.58.95:8080/http?id=" + nodeObject.id)
        .then((response) => {
          this.reshttp = response.data;
          console.log(this.reshttp);
        })
        .catch((error) => {
          console.log(error);
        });
      this.dialogTableVisible = true;
    },
    onLineClick(lineObject) {
      console.log("onLineClick:", lineObject);
    },
    getRelationShip() {
      axios
        .get("http://118.178.58.95:8080/getNode")
        .then((response) => {
          const json = JSON.parse(
            JSON.stringify(response.data)
              .replace(/wid/g, "id")
              .replace(/name/g, "text")
          );
          this.graph_json_data.nodes = json;
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get("http://118.178.58.95:8080/getRelation")
        .then((response) => {
          console.log(response);

          const json = JSON.parse(
            JSON.stringify(response.data)
              .replace(/endNode_id/g, "to")
              .replace(/startNode_id/g, "from")
              .replace(/sim/g, "text")
          );
          this.graph_json_data.links = json;
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(this.graph_json_data);
      setTimeout(() => {
        this.showSeeksGraph();
      }, 2000);
    },
  },
};
</script>

<style lang="scss"></style>

<style lang="scss" scoped></style>
