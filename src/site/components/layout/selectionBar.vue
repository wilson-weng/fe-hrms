<template>
  <el-card class="m-a-1" :body-style="{padding: 0}">
    <div class="selection-bar">
      <slot></slot>
      <el-tag v-for="item in Object.values(selectedFilter)" :key="item" v-if="item" size="small" style="margin-left: 8px;">{{item}}</el-tag>
      <el-button class="pull-right inline-block" @click="togglePanel()" size="small" v-show="selected">{{showOptions? '收起':'切换'}}</el-button>
    </div>
    <div v-show="showOptions" class="selection-panel">
      <el-row :gutter="20" type="flex">
        <el-col style="max-width: 150px" v-for="item in filters" :key="item.title" v-if="filters">
          <div style="padding: 20px;">{{item.title}}</div>
          <el-menu
            @select="onFilterSelect"
            class="selection-menu">
            <el-menu-item index="" :filter="item.title">全部</el-menu-item>
            <el-menu-item :index="option" v-for="option in item.options" :key="option" :filter="item.title">{{option}}</el-menu-item>
          </el-menu>
        </el-col>
        <el-col>
          <el-menu @select="onOptionSelect"
                   :default-active="selected && selected.id.toString()"
                   class="selection-menu major-menu">
            <div style="padding: 20px">选择公司</div>
            <el-menu-item :index="item.id.toString()" :data="item" v-for="item in filteredOptions" :key="item.id">{{item.name}}</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  export default {
  name: 'selectionBar',
  props: ['options', 'selected', 'onSelect', 'onExpand'],
  data() {
    return {
      showOptions: !this.selected,
      filteredOptions: [],
      selectedFilter: {}
    }
  },
  computed: {
    filters: function(){
      let filterObj = {};
      for(let item of this.filteredOptions){
        for(let key in item.filters){
          if(filterObj[key] && filterObj[key].indexOf(item.filters[key]) < 0){
            filterObj[key].push(item.filters[key])
          }
          if(!filterObj[key]){
            filterObj[key] = [item.filters[key]]
          }
        }
      }
      return Object.keys(filterObj).map(item=>{
        return {title: item, options: filterObj[item]}
      })
    }
  },
  watch: {
    options: function () {
      this.filteredOptions = this.options;
    },
  },
  methods: {
    onFilterSelect(index, path, vnode){
      let filterName = vnode.$attrs.filter;
      this.selectedFilter[filterName] = index;
      this.filteredOptions = this.options.filter(item=>{
        let result = true;
        for(let value of Object.values(this.selectedFilter)){
          if(value&& Object.values(item.filters).indexOf(value)<0){
            result = false;
          }
        }
        return result;
      })
    },
    onOptionSelect(index, path, vnode){
      this.showOptions = false;
      this.selectedFilter = vnode.$attrs.data.filters;
      this.onSelect && this.onSelect(index)
    },
    togglePanel(){
      this.showOptions = !this.showOptions;
      this.onExpand && this.onExpand();
    }
  },
  mounted(){
    this.filteredOptions = this.options;
  }
}
</script>

<style  scoped>
  .major-menu .el-menu-item {
    width: 240px;
    display: inline-block;
    /*border-right: 1px solid #e8e8e8;*/
  }
  .el-menu-item {
    height: 38px;
    line-height: 38px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .selection-menu {
    max-height: 230px;
    overflow-y: auto;
  }
  .selection-bar {
    height: 70px;
    padding: 20px
  }
  .selection-panel {
    max-height:300px;
    border-top: 1px solid #e8e8e8;
    padding-bottom: 20px
  }
</style>
