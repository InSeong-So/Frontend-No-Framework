export default {
  addItem(state, payload) {
    state.items.push(payload);

    return state;
  },
  clearItem(state, payload) {
    state.items.splice(payload.index, 1); // 인덱스의 배열을 하나 지웁니다.

    return state;
  },
};
