<template>
  <button
    :style="{ borderColor: 'currentColor' }"
    class="rounded-full border px-6 py-2">
    <span class="flex flex-nowrap items-baseline space-x-2">
      <Icon
        v-if="icon"
        :name="icon" />
      <span>
        <slot>{{ text }}</slot>
      </span>
    </span>
  </button>
</template>

<script>
export default {
  name: 'RoundedButton',
  props: {
    text: {
      type: String,
      default: 'Button'
    },
    icon: {
      type: String,
      default: null
    }
  }
}
</script>
