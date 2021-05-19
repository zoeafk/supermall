<template>
  <div class="tab-contorl">
    <div class="control-item"
         v-for="(item,index) of titles"
         :key="item.id"
         :class="{active: index === currentIndex}"
         @click='itemClick(index)'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabContorl',
  props: {
    titles: {
      type: Array
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index;
    }
  }
}
</script>

<style>
.tab-contorl {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.control-item {
  flex: 1;
}
.control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>