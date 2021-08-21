<template>
  <HuiDialog
    :open="modelValue"
    class="fixed inset-0 z-50 text-black dark:text-white"
    @close="onCancel">
    <div
      :class="{ 'items-stretch': !panelMode, 'items-end': panelMode }"
      class="flex justify-center h-full sm:items-center">
      <HuiDialogOverlay class="fixed inset-0 bg-black opacity-75" />
      <div
        :class="{ 'sm:max-w-md': small, 'sm:max-w-2xl': medium, 'sm:max-w-6xl': large, 'border-t': panelMode }"
        class="flex flex-col w-full m-0 sm:m-6 bg-white border-white z-10 sm:border sm:shadow-md sm:rounded dark:bg-black dark:border-gray-darkest">
        <HuiDialogTitle class="flex items-center justify-between p-4 border-b dark:border-gray-darkest">
          <span class="text-lg font-bold">
            {{ title }}
          </span>
          <Icon
            name="times-circle"
            class="cursor-pointer opacity-50 hover:opacity-75"
            @click="onCancel" />
        </HuiDialogTitle>
        <HuiDialogDescription class="flex-grow p-4 overflow-y-auto">
          <slot />
        </HuiDialogDescription>
        <div
          v-if="buttons"
          class="flex items-center justify-between p-4 border-t dark:border-gray-darkest">
          <SimpleButton
            v-if="cancelButton"
            :text="cancelButton"
            :class="buttonClass"
            class="text-danger border border-danger"
            @click="onCancel" />
          <SimpleButton
            v-if="confirmButton"
            :text="confirmButton"
            :class="buttonClass"
            class="text-white bg-primary"
            @click="onConfirm" />
        </div>
      </div>
    </div>
  </HuiDialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    panelMode: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    cancelButton: {
      type: [Boolean, String],
      default: 'Cancel'
    },
    confirmButton: {
      type: [Boolean, String],
      default: 'Confirm'
    }
  },
  watch: {
    modelValue: {
      handler(value) {
        this.$nextTick(() => {
          document.body.classList.toggle('overflow-hidden', value)
        })
      },
      immediate: true
    }
  },
  computed: {
    buttons() {
      const items = [this.confirmButton, this.cancelButton]
      return items.filter(item => !!item).length
    },
    buttonClass() {
      return this.buttons == 1 && this.small ? 'w-full' : null
    },
    small() {
      return this.size == 'small'
    },
    medium() {
      return this.size == 'medium'
    },
    large() {
      return this.size == 'large'
    }
  },
  methods: {
    onConfirm() {
      this.$emit('update:modelValue', false)
      this.$emit('confirm')
    },
    onCancel() {
      this.$emit('update:modelValue', false)
      this.$emit('close')
      this.$emit('cancel')
    }
  }
}
</script>
