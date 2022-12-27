export const state = () => ({
  menuMajor: [],
  menuMinor: []
})

export const mutations = {
  SET_MENU (state, { menuMajor, menuMinor }) {
    state.menuMajor = menuMajor
    state.menuMinor = menuMinor
  }
}

export const actions = {
  setMenu ({ commit }, { menuMajor, menuMinor }) {
    commit('SET_MENU', { menuMajor, menuMinor })
  }
}
