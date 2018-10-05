<template>
    <div>
      <div id="editor-content" ></div>
    </div>
</template>

<script>
  import E from 'wangeditor';
  export default {
    name: "richTextEditor",
    props: ['content'],
    data() {
      return {
        editorShow: false,
        editor: null,
        editorContent: '',
      }
    },
    mounted() {
      this.editor = new E('#editor-content');
      // 或者 var editor = new E( document.getElementById('editor') )
      this.editor.create()
      this.content && this.editor.txt.html(this.content);
    },
    watch: {
      content: function(val){
        this.content && this.editor.txt.html(this.content);
        !this.content && this.editor.txt.html('');
      }
    },
    methods: {
      getRichText() {
        return this.editor.txt.html()
      }

    },
  }
</script>

<style scoped>

</style>
