<template>
  <div>
    <el-button @click="visible = true">work</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <p>Try Element</p>
    </el-dialog>
  </div>
</template>

<script>
export default {

  data () {
    return {
      visible: false
    }
  }
}
</script>
