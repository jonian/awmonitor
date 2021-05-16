<template>
  <header class="sticky top-0 z-50 border-b bg-white dark:bg-black dark:border-gray-darkest">
    <div class="flex items-center justify-between container py-4">
      <div class="flex flex-nowrap items-center space-x-4">
        <img
          :alt="title"
          src="/logo.svg"
          class="w-5" />
        <h1 class="font-bold text-2xl">{{ title }}</h1>
      </div>
      <div class="flex space-x-6">
        <RoundedButton
          text="Share"
          class="text-primary"
          icon="share-alt"
          @click="onShareClick" />
        <RoundedButton
          :disabled="$app.loading"
          text="Refresh"
          class="text-success"
          icon="redo"
          @click="onRefreshClick" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  inject: ['$app'],
  data() {
    return {
      title: 'AW Monitor'
    }
  },
  methods: {
    onShareClick() {
      this.$app.share()
    },
    onRefreshClick() {
      this.$app.refresh()
    }
  }
}
</script>
