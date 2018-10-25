<template>
    <div id="pluginButton" style="margin: 4px; display: inline-block">
        <el-popover trigger="hover" v-model="showPop" :width="400">
          <div class="subtitle p-a-2" style="font-size: 0.88rem;">{{plugin.desc}}</div>
            <el-form label-position="right" label-width="120px" :model="propValues">
                <el-form-item :label="prop.comment" v-for="prop in plugin.props" :key="prop.name">
                    <el-input v-model="propValues[prop.name]" :disabled="disabled" style="width: 200px;"></el-input>
                </el-form-item>
                <div v-if="plugin.props.length == 0">无参数</div>
            </el-form>
            <div slot="reference" class="name-wrapper">
                <el-button :plain="true" type="info" size="small">
                    {{plugin.name}}
                    <i class="fa fa-th-list" v-if="plugin.props.length > 0"></i>
                </el-button>
            </div>
        </el-popover>
    </div>
</template>

<script>

    export default {
        props: ['plugin', 'props', 'disabled', 'isBind', 'onChange'],
        data() {
            return {
                showPop: false
            }
        },

        computed: {
            propValues() {
                return this.props? JSON.parse(this.props):{};
            }
        },

        methods: {
            onPluginChange(type){
                this.showPop = false;
                this.onChange && this.onChange(type, this.plugin.id, this.propValues);
            },
        },
    }
</script>

<style scoped>
  .el-form-item{
    margin-bottom: 10px;
  }
</style>
