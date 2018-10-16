<template>
  <span>
    <el-button type="text" @click="showDialog = true">{{text}}</el-button>
    <el-dialog
      :visible.sync="showDialog"
      width="30%">
      <span>{{content}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="onConfirmHandle()">确定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>

export default {
  name: "confirmButton",
  props: ['text', 'content', 'onConfirm', 'data'],
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    onConfirmHandle(){
      this.onConfirm && this.onConfirm(this.data);
      this.showDialog = false;
    }
  }
}
</script>
