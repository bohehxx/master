<template>
  <div :class="['ul-container', level == 1 ? 'levelFirstBorder' : '']">
    <ul class="tree-ul">
      <li class="tree-li" v-if="data.menuType != 3">
        <div class="tree-title">
          <span class="tree-expand" @click="handleExpand" :style="{left: level * 20 + 'px'}">
            <span v-if="!data.fold && childMenuType">
              <i class="el-icon-caret-bottom"></i>
            </span>
            <span v-if="childMenuType && data.fold">
              <i class="el-icon-caret-left"></i>
            </span>
          </span>
          <div :style="{paddingLeft: (level + 1) * 20 + 'px'}">
            <el-checkbox :indeterminate="data.isIndeterminate" v-model="data.check" @change="handleCheckMenu">
              {{ data.menuName }}
            </el-checkbox>
          </div>
          <div v-if="!data.fold && childMenuType">
            <tree-node v-for="(item, index) in data.children" :key="index" :data="item" :level="level + 1"></tree-node>
          </div>
        </div>
        <div class="btn-list" v-if="this.data.children.length && this.data.children[0].menuType == 3">
          <div class="btn-item" v-for="(item, index) in data.children" :key="index">
            <el-checkbox v-model="item.check" @change="handleCheckBtn">
              {{ item.menuName }}
            </el-checkbox>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'TreeNode',
  data() {
    return {
      isIndeterminate: false,
      checkAll: false
    }
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    level: {
      type: Number,
      default: 1
    }
  },
  computed: {
    childMenuType() {
      return this.data.children && this.data.children.length && this.data.children[0].menuType != 3
    }
  },
  methods: {
    /**展开 */
    handleExpand() {
      this.$set(this.data, 'fold', !this.data.fold)
    },
    //选中
    handleCheck(data, check) {
      this.updateTreeDown(data, check)
    },
    handleCheckMenu(check) {
      this.handleCheck(this.data, check)
    },
    handleCheckBtn(check) {
      this.handleCheck(this.data.children, check)
    },
    //递归更新选中状态
    updateTreeDown(data, check) {
      this.$set(data, 'check', check)
      if (data.children && data.children.length) {
        data.children.forEach(item => {
          this.updateTreeDown(item, check)
        })
      }
    }
  },
  watch: {
    'data.children': {
      handler(data) {
        if (data) {
          const checkedAll = !data.some(item => !item.check)
          const isIndeterminate = data.some(item => item.check) && !checkedAll
          this.$set(this.data, 'isIndeterminate', isIndeterminate)
          this.$set(this.data, 'check', checkedAll)
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
ul,
li {
  padding: 0;
  margin: 0;
}
.levelFirstBorder {
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  &:last-child {
    border-bottom: 1px solid #d9d9d9;
  }
}
.tree-ul {
  position: relative;
  list-style: none;
}
.ul-container {
  width: calc(100vw - 300px);
  flex-shrink: 0;
  border-top: 1px solid #eee;
}
::v-deep.el-checkbox__inner {
  border: 1px solid #999;
}
.tree-ul {
  .btn-list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    border-left: 1px solid #eee;
    .btn-item {
      width: 200px;
      padding-left: 20px;
    }
  }
}
.tree-li {
  position: relative;
  display: flex;
  line-height: 40px;
  .tree-title {
    min-width: 280px;
  }
}
.tree-expand {
  cursor: pointer;
  position: absolute;
  color: #333;
  font-size: 16px;
}
.node-icon {
  font-size: 16px;
}
</style>
