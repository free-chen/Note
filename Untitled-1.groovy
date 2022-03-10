
    mounted(){
        // eslint-disable-next-line no-undef
        tinymce.init({
            selector:'#tinymce-editor',
            language: 'zh_CN',

            //菜单栏
            menubar: 'bar1 bar2',
            menu:{
                 bar1:{ title: '菜单栏1' , items:'copy paste' },
                 bar2:{ title: '菜单栏2', items:'cut preview'}
            },

            //工具栏
            toolbar: 'undo redo preview',
  
            //插件  
            plugins: 'preview' ,//预览

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