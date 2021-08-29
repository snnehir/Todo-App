import {createStore} from "vuex"
// Secure localStorage data with high level of encryption and data compression.
import SecureLS from "secure-ls"
var ls = new SecureLS({ isCompression: false });
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state:{
        user: null,
        // saltKey: "saltKey123"
    },

    getters: {
        isAuthenticated: (state) => state.user !== null,
        getCurrentUser(state){
            const user = state.user
            delete user?.password // optional chaining
            return user
        },
    },
    
    mutations: {
        // authenticated => true
        setUser(state, user){
            state.user = user
        },
        // authenticated => false
        logoutUser(state){
            state.user = null
        },
    },
   
    plugins: [ 
        createPersistedState({
        storage: {
            // Default Encoding and Data Compression
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
        },
      }),
    ]

})