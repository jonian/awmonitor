<template>
  <header class="sticky top-0 z-50 border-b bg-white dark:bg-black dark:border-gray-darkest">
    <div class="flex items-center justify-between container py-2 sm:py-4">
      <div class="flex flex-nowrap items-center space-x-4 py-2 sm:py-0">
        <img
          :alt="title"
          src="/logo.svg"
          class="w-5" />
        <h1 class="font-bold text-xl whitespace-nowrap sm:text-2xl">
          {{ title }}
        </h1>
      </div>
      <div class="flex space-x-4 sm:space-x-6">
        <ShareButton
          :tag="buttonTag"
          :show-text="$screen.xs" />
        <ReloadButton
          :tag="buttonTag"
          :show-text="$screen.xs" />
      </div>
    </div>
    <OnlineStatus />
  </header>
</template>

<script>
export default {
  name: 'Header',
  inject: ['$screen'],
  data() {
    return {
      title: 'AW Monitor'
    }
  },
  computed: {
    buttonTag() {
      return this.$screen.sm ? RoundedButton : LinkButton
    }
  }
}
</script>
