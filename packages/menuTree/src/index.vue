<template>
  <div>
    <tree-node v-for="(item, index) in cloneData" :key="index" :data="item" :show-checkbox="showCheckbox"></tree-node>
  </div>
</template>
<script>
import TreeNode from './node.vue'
import {deepCopy} from './assist.js'

export default {
  name: 'MenuTree',
  components: {TreeNode},
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    nodeKey: {
      type: String,
      default: 'menuId'
    }
  },
  data() {
    return {
      cloneData: []
    }
  },
  created() {
    this.rebuildData()
  },
  watch: {
    data() {
      this.rebuildData()
    }
  },
  methods: {
    rebuildData() {
      this.cloneData = deepCopy(this.data)
    },
    getStausTreeId(arr, prop) {
      var temp = []
      var forFn = list => {
        for (var i = 0; i < list.length; i++) {
          var item = list[i]
          if (item[prop]) {
            temp.push(item[this.nodeKey])
            forFn(item.children)
          }
        }
      }
      forFn(arr)
      return temp
    },
    //全选id
    getCheckedKeys() {
      return this.getStausTreeId(this.cloneData, 'check')
    },
    //半选id
    getHalfCheckedKeys() {
      return this.getStausTreeId(this.cloneData, 'isIndeterminate')
    }
  }
}
</script>
