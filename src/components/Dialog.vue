<template>
  <Dialog
    :open="modelValue"
    class="fixed inset-0 z-50 text-black dark:text-white"
    @close="onCancel">
    <div class="flex items-stretch justify-center h-screen sm:items-center">
      <DialogOverlay class="fixed inset-0 bg-black opacity-75" />
      <div class="flex flex-col max-w-2xl w-full m-0 sm:m-6 bg-white border-white z-10 sm:border sm:shadow-md sm:rounded dark:bg-black dark:border-gray-darkest">
        <DialogTitle class="flex items-center justify-between p-4 border-b dark:border-gray-darkest">
          <span class="text-lg font-bold">
            {{ title }}
          </span>
          <Icon
            name="times-circle"
            class="cursor-pointer opacity-50 hover:opacity-75"
            @click="onCancel" />
        </DialogTitle>
        <DialogDescription class="flex-grow p-4 overflow-y-auto">
          <slot />
        </DialogDescription>
        <div class="flex items-center justify-between p-4 border-t dark:border-gray-darkest">
          <SimpleButton
            v-if="cancelButton"
            class="text-danger border border-danger"
            @click="onCancel">
            {{ cancelButton }}
          </SimpleButton>
          <SimpleButton
            v-if="confirmButton"
            class="text-white bg-primary"
            @click="onConfirm">
            {{ confirmButton }}
          </SimpleButton>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { Dialog, DialogOverlay, DialogTitle, DialogDescription } from '@headlessui/vue'

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
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
