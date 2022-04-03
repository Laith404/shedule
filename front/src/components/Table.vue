<template>
  <v-main class="main">
    <v-container>
      <v-row class="ml-1 mt-1">
        <div class="text-h5 title-main white--text">Расписание на</div> 
        <v-select :items="day"
        hide-spin-buttons
        hide-details
        item-color="primary"
        dense
        color="white"
        v-model="activeDay"
        class="daySelect text-h5"
        ></v-select>
        <v-btn class='print' @click="window.print()">Печатать</v-btn>
        <v-btn class='exit' @click="logout()">Выйти</v-btn>
      </v-row>
      <v-divider class="mt-4 mb-4"></v-divider>
      <v-row>
        <Element
        v-for="item in blocks"
        :key="item.id"
        :element="item" 
        
        >
        </Element>
      </v-row>
       <v-snackbar
        v-model="activeSnackbar"
        right
        class="snackbar"
        :class="[activeError ? 'mes-error' : 'not-error']"
        :timeout="timeout">
        {{ message }}
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import Element from "./element.vue";
import {day} from "@/store/entity.js";

export default {
  name: "VTable",
  components: { Element },
  data() {
    return {
      day,
      activeDay: "Понедельник",
      timeout: 2000,
    }
  },
  methods: {
    ...mapMutations([
      "SNACKBAR",
      "ERROR",
    ]),
     logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
  },
  computed: {
    ...mapGetters(["blocks", "message","PRODUCTS"]),
    ...mapState([
      "snackbar",
      "error"
    ]),
    ...mapActions([
            "GET_STORE_API"
        ]),
     activeSnackbar: {
      get() {
        return this.snackbar;
      },
      set(value) {
        this.SNACKBAR(value);
      },
    },
    activeError: {
      get() {
        return this.error;
      },
      set(value) {
        this.ERROR(value);
      },
    },
  },
   mounted() {
        this.GET_STORE_API
        .then((response) => {
            if(response.data) {
               console.log('hello')
            }
        })
    }
};
</script>

<style lang="sass">
.main
  margin-left: 21.25rem
  background: var(--v-info-darken3)
.daySelect
  border: 0
  margin-top: 0!important

.v-text-field>.v-input__control>.v-input__slot:after, .v-text-field>.v-input__control>.v-input__slot:before
  content: none!important

.v-select.v-input--dense .v-select__selection--comma
  color: var(--v-info-lighten3)

.v-input__slot
  margin: 0!important

.v-select__selection--comma
  overflow: visible!important

.title-main
  margin-right: .625rem

.v-input__icon
  display: none!important

.mes-error .v-snack__wrapper.theme--dark
  background: var(--v-error-base)!important
.not-error .v-snack__wrapper.theme--dark
  background: var(--v-success-darken1)!important

.print
  position: absolute
  top: -0.3125rem
  right: 1.875rem
.exit
  position: absolute
  top: -0.3125rem
  right: 1.25rem
@media print
  .print
    display: none!important
  .main
    margin-left: 0
</style>
