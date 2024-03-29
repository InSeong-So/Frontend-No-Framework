export const logEffect = effect => {
  let effectInfo;
  switch (effect.type) {
    case 'fork':
      effectInfo = effect.saga.name;
      break;
    case 'take':
      effectInfo = effect.actionType;
      break;
    case 'select':
      effectInfo = effect.selector.name;
      break;
    case 'call':
      effectInfo = effect.fn.name;
      break;
    case 'put':
      effectInfo = `${effect.action.type} ${JSON.stringify(
        effect.action.payload,
      )}`;
      break;
    default:
      break;
  }
  console.log(
    `%ceffect: %c${effect.type}%c ${effectInfo}`,
    'color: gray',
    'color: green; font-weight: bold',
    'color: salmon; font-weight: bold',
  );
};

export const logAction = (action, newState) => {
  console.log(
    `%caction: %c${action.type}%c ${
      action.payload ? JSON.stringify(action.payload) : ''
    }%c\nnew state:%c ${JSON.stringify(newState)}`,
    'color: gray',
    'color: orange; font-weight: bold',
    'color: salmon; font-weight: bold',
    'color: gray',
    'color: skyblue; font-weight: bold',
  );
};
