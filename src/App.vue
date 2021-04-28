<template>
  <v-app>
    <v-main>
      <v-card>
        <v-card-text>
          <v-text-field label="URL" v-model="link"></v-text-field>
          <v-text-field label="Fixed" v-model="fixed_link"></v-text-field>
          <v-btn raised :href="fixed_link" target="_blank" class="mr-1">Open</v-btn>
          <v-btn raised @click="copyText" class="ml-1">Copy</v-btn>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    link: null,
    fixed_link: null,
  }),

  watch: {
    link() {
      this.fixLink()
    }
  },

  methods: {
    fixLink(){
      // MIT - Copyright (c) 2010-Present Jon Parise <jon@indelible.org>
      // https://github.com/jparise/chrome-utm-stripper/
      const searchPattern = new RegExp('utm_|stm_|clid|_hs|icid|igshid|linkid|mc_|mkt_tok|yclid|_openstat|wicked|otc|oly_|rb_clickid|soc_', 'i');
      const replacePattern = new RegExp(
          '([?&]' +
          '(icid|mkt_tok|(g|fb)clid|igshid|_hs(enc|mi)|linkid|mc_[ce]id|(utm|stm)_(source|medium|term|campaign|content|cid|reader|referrer|name|social|social-type)|rb_clickid|yclid|_openstat|wickedid|otc|oly_(anon|enc)_id|soc_(src|trk))' +
          '=[^&#]*)',
          'ig')

      const url = this.link
      const queryStringIndex = url.indexOf('?')
      if (url.search(searchPattern) > queryStringIndex) {
        let stripped = url.replace(replacePattern, '')
        if (stripped.charAt(queryStringIndex) === '&') {
          stripped = `${stripped.substr(0, queryStringIndex)}?${stripped.substr(queryStringIndex + 1)}`;
        }
        this.fixed_link = stripped
      }
      else {
        this.fixed_link = url
      }
    },
    copyText() {
      navigator.clipboard.writeText(this.fixed_link);
    }
  }
};
</script>
