<template>
  <button
    :style="{ borderColor: 'currentColor' }"
    :class="{ 'opacity-50': disabled, 'pointer-events-none': disabled }"
    class="rounded-full border px-6 py-2 outline-none focus:outline-none">
    <span class="flex flex-nowrap items-baseline justify-center space-x-2">
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
