<template>
  <i
    :class="iconClass"
    class="uil" />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconClass() {
      return `uil-${this.name}`
    }
  }
}
</script>
