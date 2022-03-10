<template>
  <section id="tinymce-editor"></section>
</template>

<script>
import './tinymce.min.js';
import './themes/silver/theme.min.js';
import 'tinymce/icons/default';
import './langs/zh_CN';
import './plugins/preview/plugin.min.js';

import "tinymce/themes/silver/theme";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";

// import e from './tinymce.min.js';


export default {
    // components:{
    //     editor
    // },
    props:{
        value:{
            type: String,
           
            default: ''
        },

        // 接收传过来的地址
        uploadUrl: {
            type: String,
            required: true
        }
    },
    mounted(){
        // eslint-disable-next-line no-undef
        tinymce.init({
            selector:'#tinymce-editor',
            language: 'zh_CN',

            //菜单栏

            //工具栏
            toolbar: 'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat',
  
            //插件  
            plugins: 'lists image media table textcolor wordcount contextmenu',

            height: 500,

            //监听 tinymce初始化完成事件
            setup: (editor) => {
                // eslint-disable-next-line no-unused-vars
                editor.on('init',(e) => {
                    editor.setContent(this.value);
                } );
            },      
            
            //监听 input 和 change 事件 实时更新value
            init_instance_callback: (editor) => {
                editor.on('input',(e) =>{
                    this.$emit('input',e.target.innerHTML);
                });
                editor.on('change',(e) =>{
                    this.$emit('input',e.level.content)
                } );
            }
        });   

    },

      data() {
    return {
      //初始化配置
      init: {
        skin_url: '/static/tinymce/skins/lightgray',
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        // eslint-disable-next-line no-unused-vars
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        }
      },
      myValue: this.value
    }
  },
}
</script>

<style lang="less" scoped>
@import url('./skins/ui/oxide/skin.min.css');
</style>