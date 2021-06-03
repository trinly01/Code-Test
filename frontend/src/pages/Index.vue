<template>
  <q-page class="flex flex-center">
    <img
      v-if="this.$global.movie"
      :src="this.$global.movie.Poster"
      style="max-width: 500px; max-height: 70vh;"
    >
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
