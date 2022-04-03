<template>
  <v-card 
  max-width="260"
  min-width="260"
  class="pt-1 pb-2 px-4 ma-4 white--text"
  color="primary">
  <v-card-title>
    {{ element.kyrs }}
    <v-spacer></v-spacer>
    <v-btn @click="deleteElement" class="delete-btn" color="white" text> <i class="fas fa-xmark" style="font-size: 20px;"></i></v-btn>
  </v-card-title>
  <v-list class="rounded">
    <v-list-item class="justify-center">
     {{ element.group }}
    </v-list-item>
    <v-list-item class="justify-center">
      {{ element.para }}
    </v-list-item>
    <v-list-item class="justify-center">
      {{ element.pred }}
    </v-list-item>
    <v-list-item class="justify-center">
      {{ element.item }}
    </v-list-item>
    <v-list-item class="justify-center">
      {{ element.cab }}
    </v-list-item>
  </v-list>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "element",
  props: ["element"],
  methods: {
    ...mapMutations([
      "DELETEITEM",
    ]),
    deleteElement() {
      this.DELETEITEM(this.element);
    },
  }
};
</script>

<style lang="sass" scoped>
.delete-btn
  position: absolute
  right: 0
  top: .3125rem
.v-list-item
  min-height: 1.875rem!important

@media print
  .delete-btn
    display: none
</style>


