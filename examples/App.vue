<template>
  <div id="app">
    <Cz-Table></Cz-Table>
    <menu-tree :data="treeData" nodeKey="menuId"></menu-tree>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
         treeData: [
        {
          menuId: 2636,
          menuName: '数字大屏',
          check: false,
          children: [
            {menuId: 1104, menuName: '警力分布', check: true, children: []},
            {menuId: 1111, menuName: '告警管理', check: false, children: []}
          ]
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

</style>
