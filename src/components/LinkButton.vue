<template>
  <button
    :class="{ 'opacity-50': disabled, 'pointer-events-none': disabled }"
    :aria-label="text"
    class="p-2 outline-none focus:outline-none">
    <span class="flex flex-nowrap items-baseline justify-center space-x-2">
      <Icon
        v-if="icon"
        :name="icon"
        :class="iconClass" />
      <slot>
        <span v-if="text">
          {{ text }}
        </span>
      </slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'LinkButton',
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
    },
    iconClass: {
      type: [String, Array, Object],
      default: null
    }
  }
}
</script>
