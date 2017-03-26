<template>
<div class="hello">Hello, {{ name }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  data(): AppData {
    return { name: 'Vue.js' }
  }
}

interface AppData {
  name: string
}
</script>