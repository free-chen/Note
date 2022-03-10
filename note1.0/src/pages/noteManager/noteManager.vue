<template>
  <el-container style="margin-left: -20px;margin-top: -20px;height: 900px;">
    <el-aside style="border-right: solid 1px #e6e6e6;">
      <sidebar @send="send" @sendshareIds="sendshareIds"></sidebar>
    </el-aside>
    <el-main>
      <noteview :sends="sends" :sendshareId="sendshareId"></noteview>
    </el-main>
  </el-container>
</template>
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/sockjs-client/1.0.2/sockjs.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>

<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import sidebar from "./components/sidebar.vue";
import noteview from "./components/noteview.vue";
import request from "@/network/request";
// import sockJS from 'https://cdn.bootcdn.net/ajax/libs/sockjs-client/1.5.0/sockjs.min.js'
// import Stomp from 'https://cdn.bootcdn.net/ajax/libs/stomp.js/2.3.3/stomp.min.js'
export default {
  data() {
    return {
      categories: {},
      notes: {},
      selectedCategory: "",
      dialogVisible: false,
      inshareId: "",
      noteId: "001",
      sends: "",
      from: "kkk",
      stompClient: null,
      sendshareId: "",
    };
  },
  components: {
    sidebar,
    noteview,
  },
  created() {
    this.WebsocketConnect();
  },
  methods: {
    WebsocketConnect() {
      var socket = new SockJS("http://localhost:8001/endpoint-websocket");
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, function(frame) {
        this.setConnected(true);
        console.log("Connected");
        this.stompClient.subscribe("/chat/single/" + this.from, function(
          result
        ) {
          console.log(JSON.parse(result.body));
        });
      });
    },
    setConnected(connected) {
      $("#connect").prop("disabled", connected);
      $("#disconnect").prop("disabled", !connected);
      if (connected) {
        $("#conversation").show();
      } else {
        $("#conversation").hide();
      }
      $("#notice").html("");
    },
    // share() {
    //   requst
    // },
    send(index) {
      this.sends = index;
    },
    sendshareIds(indexshareId) {
      this.sendshareId = indexshareId;
      console.log("shareidnotemanager" + this.sendshareId);
    },
    setConnected(connected) {
      $("#connect").prop("disabled", connected);
      $("#disconnect").prop("disabled", !connected);
      if (connected) {
        $("#conversation").show();
      } else {
        $("#conversation").hide();
      }
      $("#notice").html("");
    },
  },
};
</script>
