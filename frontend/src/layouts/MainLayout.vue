<template>
  <q-layout view="hHh LpR lFr">
    <q-header elevated>
      <q-toolbar class="bg-dark">
        <q-btn
          color="primary"
          flat
          dense
          round
          icon="polymer"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Heron Pogi
        </q-toolbar-title>
        <div>{{ title }}</div>
        <div>{{ search }}</div>
        <q-space />
        <div>Trinmar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-10"
    >
      <div class="full-height">
        <q-tabs
          no-caps
          v-model="tab"
          narrow-indicator
          class="text-grey"
          active-color="white"
          indicator-color="white"
          align="justify"
        >
          <q-tab name="movies" label="Movies" />
          <q-tab name="components" label="Components" />
        </q-tabs>

        <q-separator />

        <q-input v-model="search" :debounce="750" @input="searchMovies" dark bg-color="dark" outlined class="q-ma-md" style="outline-color: #212121" value dense />

        <q-tab-panels v-model="tab" animated class="bg-grey-10">
          <q-tab-panel name="movies" class="no-margin no-padding">
            <q-list>
              <q-item v-for="item in movies"
                @click.native="selectMovie(item)" :key="item.imdbID" clickable v-ripple>
                <q-item-section thumbnail>
                  <!-- <q-avatar rounded> -->
                    <img :src="item.Poster">
                  <!-- </q-avatar> -->
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ item.Title }}</q-item-label>
                  <q-item-label caption>{{ item.Year }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="components">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-drawer>

    <q-drawer show-if-above side="right" bordered>
      <div class="full-height">
        <q-tabs
          inline-label
          no-caps
          v-model="tab"
          narrow-indicator
          class="text-grey"
          active-color="white"
          indicator-color="white"
          align="justify"
        >
          <q-tab name="style" icon="palette" label="Style" />
          <q-tab name="image" icon="image" label="Image Slice" />
        </q-tabs>

        <q-separator />

        <q-input dark bg-color="dark" outlined class="q-ma-md" style="outline-color: #212121" value dense />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  // components: { EssentialLink },
  mounted () {
    this.$q.dark.set(true)
    console.log(this.$global)
    this.getMovieList()
  },
  data () {
    return {
      leftDrawerOpen: false,
      tab: 'movies',
      movies: [],
      search: ''
    }
  },
  computed: {
    title () {
      return this.$global.movie?.Title
    }
  },
  methods: {
    async getMovieList () {
      const result  = await this.$axios.get(this.$movieAPI + 's=china')
      this.movies = result.data.Search
    },
    selectMovie(m) {
      this.$global.movie = m
      console.log(this.$global.movie)
    },
    async searchMovies() {
      if (this.search.length > 3) {
        const result = await this.$axios.get(`${this.$movieAPI}s=${this.search}`)
        return this.movies = result.data.Search
      }
      await this.getMovieList()
    }
  }
}
</script>
