<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "ErrorMessage",
  data() {
    return {
      text: '',
    }
  },
  methods: {
    show(text) {
      this.text = text;
    },
    hide() {
      this.text = ''
    }
  },
})
</script>

<template>
  <article
    class="message"
    :class="{ 'message--hidden': !text }"
  >
    <div class="message-header">
      <slot name="header">
        <p>Error</p>
      </slot>
      <button class="delete" @click="hide"></button>
    </div>

    <div class="message-body">
      <slot :text="text">Message</slot>
    </div>
  </article>
</template>

<style scoped>

</style>