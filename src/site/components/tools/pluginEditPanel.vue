<template>
    <div id="pluginEditPanel">
        <div class="h2">当前插件</div>
        <plugin-button :props="plugin.props" :plugin="plugins[plugin.plugin_id]" v-for="plugin in curPlugins"
                       :key="plugin.key" :is-bind="true" :on-change="onPluginChange" v-if="plugins[plugin.plugin_id]"></plugin-button>
        <div class="h2">所有插件</div>
        <el-row :gutter="16" style="margin-top: 2rem;">
              <el-col v-for="cat in pluginCats" :key="cat" :span="6">
                  <div class="text-bold">{{ cat }}</div>
                  <plugin-button :plugin="plugin" v-if="plugin.category == cat" v-for="plugin in plugins" :key="plugin.id" :on-change="onPluginChange"></plugin-button>
              </el-col>
          </el-row>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import pluginButton from './pluginButton.vue';

    export default {
        props: [],
        components: { pluginButton },
        computed: {
            ...mapState({
                plugins: state => state.proj.plugins,
                curPlugins: state => state.proj.curPlugins,
                pluginCats: state => state.proj.pluginCats,
                curProjId: state => state.proj.curProjId,
            }),
        },
        methods: {
            ...mapActions(['updatePlugin']),
            onPluginChange(type, pluginId, props){
                let params = {
                    proj_id: this.curProjId,
                    plugin_id: pluginId,
                    props: JSON.stringify(props),
                    is_del: type == 'remove'? 1:0
                };
                this.updatePlugin(params);
                this.$emit('changePlugin', type, pluginId);
            }
        },
    }
</script>
