<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <svg-icon iconClass='eye-open'></svg-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    // console.log(1)
    // this.$store.dispatch('user/getUserInfos')
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
