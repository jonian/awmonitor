<template>
  <button
    :class="{ 'opacity-50': disabled, 'pointer-events-none': disabled }"
    class="rounded-md px-4 py-2 outline-none focus:outline-none">
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
  name: 'SimpleButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
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
