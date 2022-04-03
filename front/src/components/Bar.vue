<template>
  <v-navigation-drawer
  color="primary"
  fixed
  width="340"
  class="sidebar"
  permanent
  >    
  <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title text-body-1 font-weight-bold white--text">
        Ярославский колледж управления и профессиональных технологий
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  
    <v-list class="mt-6"> 
      <v-list-item>
        <!-- <v-select
          return-object
          :items="kyrs"
          v-model="updateKyrs"
          label="Курс"
          solo
          required
        ></v-select> -->
    <select v-model="updateKyrs" class="my-select">
        <option v-for="(item, index) in kyrs" :key='index'>{{ index }}</option>
    </select>
      </v-list-item>
      <v-list-item>
        <v-select
          :items="kyrs[updateKyrs]"
          v-model="updateGroup"
          return-object
          item-text="name"
          item-value="name"
          label="группа"
          solo
          required
        ></v-select>
      </v-list-item>
      <v-list-item>
        <v-select
          :items="para"
          v-model="updatePara"
          label="Пара"
          solo
          required
        ></v-select>
      </v-list-item>
      <v-list-item>
        <v-select
          :items="cab"
          v-model="updateCab"
          label="Кабинет"
          solo
          required
        ></v-select>
      </v-list-item>
      <v-list-item>
        <v-select
          :items="pred"
          v-model="updatePred"
          label="Преподаватель"
          solo
          required
        ></v-select>
      </v-list-item>
      <v-list-item>
        <v-select
          :items="item"
          v-model="updateItem"
          label="Предмет"
          solo
          required
        ></v-select>
      </v-list-item>
    </v-list>
    <v-spacer></v-spacer>
    <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="createdElement()">
              Создать
            </v-btn>
          </div>
        </template>
  </v-navigation-drawer>
</template>

<script>
import { kyrs, cab, item, pred, para} from "@/store/entity.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "vBar",
  data() {
    return {
      kyrs,
      cab,
      item,
      pred,
      para,
      number: 0
    }
  },
  methods: {
    ...mapMutations([
      "UPDATEKYRS",
      "UPDATEPARA",
      "UPDATEITEM",
      "UPDATECAB",
      "UPDATEGROUP",
      "UPDATEPRED",
      "CREATEDELEMENT",
    ]),
    createdElement() {
      this.number = this.blocks.length + 1;
      this.CREATEDELEMENT(this.number);
    },
  },
  computed: {
    ...mapState([
      "vkyrs",
      "vcab",
      "vitem",
      "vpred",
      "vpara",
      "vgroup",
      "blocks",
    ]),
    // eslint-disable-next-line vue/no-dupe-keys
    updateKyrs: {
      get() {
        return this.vkyrs;
      },
      set(value) {
        this.UPDATEKYRS(value);
      },
    },
    updatePara: {
      get() {
        return this.vpara;
      },
      set(value) {
        this.UPDATEPARA(value);
      },
    },
    updateCab: {
      get() {
        return this.vcab;
      },
      set(value) {
        this.UPDATECAB(value);
      },
    },
    updatePred: {
      get() {
        return this.vpred;
      },
      set(value) {
        this.UPDATEPRED(value);
      },
    },
    updateItem: {
      get() {
        return this.vitem;
      },
      set(value) {
        this.UPDATEITEM(value);
      },
    },
    updateGroup: {
      get() {
        return this.vgroup;
      },
      set(value) {
        this.UPDATEGROUP(value);
      },
    },
  },
}
</script>

<style lang="sass" scoped>
.sidebar
  display: flex
  flex-direction: column
  justify-content: space-between
.title 
  white-space: normal!important
.color-line
  border-color: var(--v-info-darken3)
.my-select
  width: 100%
  min-height: 2.375rem
  outline: none
  background: white
  padding: 10px
  margin-bottom: 20px
  border-radius: 3px
  box-shadow: 0 5px 10px rgba(0,0,0,.25)

@media print
  .sidebar
    display: none
</style>


