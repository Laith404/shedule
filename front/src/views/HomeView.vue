<template>
  <div class="home d-flex fill-height">
   <v-bar />
   <v-table />
  </div>
</template>

<script>
// @ is an alias to /src
import vBar from "@/components/Bar.vue";
import vTable from "@/components/Table.vue";

export default {
  name: 'HomeView',
  components: {
    vBar,
    vTable,
  },
}
</script>
