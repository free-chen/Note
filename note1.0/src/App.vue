
<template>
    
  <div id="app" >
    <router-view></router-view>
  </div>
</template>

    
<script>


export default {
  name: 'app',
  data() {
       return{
           rate:null
       }
    },
  mounted(){
            // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
            window.onbeforeunload = function () {
                var storage = window.localStorage;
                storage.clear()
            }
        },

  methods:{

      Link(path){
          this.$router.push("/"+path)
      }
      

  },
    computed:{
        navIndex() {
            return this.$route.name;
        }
    }



}
</script>

