import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vkyrs: "3 курс",
    vpara: "1 пара",
    vitem: "Предмет1",
    vpred: "Преподаватель1",
    vcab: "215",
    vgroup: {name: "ИП1-31", kyrs: 3},
    blocks: [],
    error: false,
    textMessage: "",
    snackbar: false,
    product: [],
    status: '',
    user: {},
    token: localStorage.getItem('token') || '',
  },
  getters: {
    blocks: (state) => {
      return state.blocks;
    },
    message: state => {
      return state.textMessage;
    },
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    CREATEDELEMENT(state, number) {
        if(state.blocks.every(item => {
          return item.para !== state.vpara ||
             item.pred !== state.vpred &&
             item.cab  !== state.vcab &&
             item.group !== state.vgroup
        })) {
          state.blocks.push({
            kyrs: state.vkyrs,
            para: state.vpara,
            item: state.vitem,
            pred: state.vpred,
            cab: state.vcab,
            group: state.vgroup.name,
            kyrsid: state.vgroup.kyrs,
            id: number,
          });
          state.snackbar = true;
          state.error = false;
          state.blocks = state.blocks.sort((p1,p2) => {
            return p1.kyrsid < p2.kyrsid ? -1 : 1;
          });
          console.log(state.blocks[0].group.kyrs);
          return state.textMessage = "Элемент создан"
        } else {
          state.snackbar = true;
          state.error = true;
          return state.textMessage = "Ошибка!"
        }
        
      
    },

    DELETEITEM: (state, block) => {
        let item = state.blocks.find( i => i.id === block.id );
        if(item) {
          state.blocks = state.blocks.filter(i => i.id !== block.id)
        }
    },
    UPDATEKYRS(state, kyrs) {
      state.vkyrs = kyrs;
    },
    UPDATEPARA(state, para) {
      state.vpara = para;
    },
    UPDATEITEM(state, item) {
      state.vitem = item;
    },
    UPDATEPRED(state, pred) {
      state.vpred = pred;
    },
    UPDATECAB(state, cab) {
      state.vcab = cab;
    },
    UPDATEGROUP(state, group) {
      state.vgroup = group;
    },
    SNACKBAR(state, value) {
      state.snackbar = value;
    },
    ERROR(state, value) {
      state.error = value;
    }
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:3000/auth/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user =  resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
     }
  },
})
