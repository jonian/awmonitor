<template>
  <div
    :style="{ width: size }"
    class="max-w-full rounded-3xl bg-white p-8">
    <div
      class="aspect-w-1 aspect-h-1 h-0 w-full"
      ref="code" />
  </div>
</template>

<script>
import QrCreator from 'qr-creator'

export default {
  name: 'QrCode',
  props: {
    value: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '250px'
    }
  },
  watch: {
    value:'updateCanvas'
  },
  methods: {
    updateCanvas() {
      try {
        const options = {
          text: this.value,
          radius: 0.0,
          ecLevel: 'M',
          fill: '#000000',
          background: null,
          size: 186
        }

        QrCreator.render(options, this.$refs.code)
      } catch (e) {
        console.log(e);
      } finally {

      }
    }
  },
  mounted() {
    this.updateCanvas()
  }
}
</script>
