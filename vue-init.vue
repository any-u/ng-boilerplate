<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: '{{name}}',
    data() {
      return {

      }
    },
    {{#if useMounted}}
    mounted () {
      this.init()
    },
    {{else}}
    created() {
      this.init()
    },
    {{/if}}
    methods: {
      init() {
        
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>