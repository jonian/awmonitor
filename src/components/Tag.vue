<template>
  <span class="px-2 py-1 text-gray-dark bg-gray-lightest border rounded-md whitespace-nowrap dark:bg-gray-darkest dark:border-gray-dark">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
