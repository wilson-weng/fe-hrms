<template>
  <span>
    <el-button type="text" @click="showDialog = true">{{text}}</el-button>
    <el-dialog
      :visible.sync="showDialog"
      :title="title"
      width="50%">
      <info-list-item v-for='item in Object.keys(rowData)' :title="item" :value="rowData[item]" :key="item"></info-list-item>
    </el-dialog>
  </span>
</template>

<script>
import infoListItem from '../infoListItem.vue'
export default {
  name: "detailDialogButton",
  props: ['text', 'title', 'rowData'],
  components: {infoListItem},
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
  }
}
</script>
