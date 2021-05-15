<template>
  <input
    :value="modelValue"
    class="block py-2 px-3 w-full rounded-md border shadow-sm outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-25 dark:bg-black dark:border-gray-darkest dark:focus:border-primary"
    @input="onInput"
    @change="onChange" />
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    onChange(event) {
      this.$emit('change', event.target.value)
    }
  }
}
</script>
