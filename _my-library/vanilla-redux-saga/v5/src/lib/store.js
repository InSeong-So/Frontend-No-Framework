import { createStore } from '../createStore.js'

const initialState = {
  userId: 1
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'getUserSuccess':
      return { ...state, user: action.payload }
    default:
      return state
  }
}

export const store = createStore(reducer)

export const selectUserId = state => state.userId

window.store = store
