<template>
  <footer class="border-t text-gray-dark dark:bg-black dark:border-gray-darkest">
    <div class="flex items-center justify-between container py-4">
      <a
        href="https://github.com/jonian/awmonitor"
        target="_blank"
        class="flex flex-nowrap items-center space-x-2">
        <Icon name="github" class="text-gray-light dark:text-gray-darker transform scale-125" />
        <span class="text-sm">View on GitHub</span>
      </a>
      <a
        href="https://vuejs.org"
        target="_blank"
        class="flex flex-nowrap items-center space-x-2">
        <span class="text-sm">Created with</span>
        <Icon name="vuejs" class="text-gray-light dark:text-gray-darker transform scale-125" />
        <span class="text-sm">Vue.js</span>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
