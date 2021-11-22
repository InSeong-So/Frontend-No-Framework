export default {
  addItem(context, payload) {
    context.commit('addItem', payload);
  },
  clearItem(context, payload) {
    context.commit('clearItem', payload);
  },
  completeItem(context, payload) {
    context.commit('completeItem', payload);
  },
};
