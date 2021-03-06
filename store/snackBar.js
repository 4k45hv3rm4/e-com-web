const state = () => ({
    text: '',
    color: '',
    timeout: '',
  });
  
  const mutations = {
    SHOW_MESSAGE (state, payload) {
      state.text = payload.text;
      state.color = payload.color;
      state.timeout = payload.timeout;
    },
  };
  
  const actions = {
    showSnack ({commit}, payload) {
      commit ('SHOW_MESSAGE', payload);
    },
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
  };
  