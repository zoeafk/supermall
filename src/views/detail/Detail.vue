<template>
  <div>
    {{iid}}
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      iid: null
    }
  },
  activated () {
    this.iid = this.$route.params.iid
  }
}
</script>

<style>
</style>