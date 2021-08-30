<template>
  <div
    v-if="visible"
    :class="{ 'bg-danger': !isOnline, 'bg-success': isOnline }"
    class="py-2 text-white">
    <div class="container flex items-center space-x-2">
      <template v-if="isOnline">
        <Icon
          name="wifi"
          class="text-lg" />
        <span>Application is online again. Updates are enabled.</span>
      </template>
      <template v-else>
        <Icon
          name="wifi-slash"
          class="text-lg" />
        <span>Application is offline. Updates are disabled.</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OnlineStatus',
  inject: ['$app'],
  watch: {
    isOnline(value) {
      if (value) {
        this.visible = true
        setTimeout(() => this.visible = false, 2000)
      } else {
        this.visible = true
      }
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    isOnline() {
      return this.$app.isOnline
    }
  },
  mounted() {
    if (!this.isOnline) {
      this.visible = true
    }
  }
}
</script>
