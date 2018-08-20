<template>
  <div>
    <el-button @click="visible = true">fine</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <p>Try Element</p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      visible: false
    }
  }
}
</script>
