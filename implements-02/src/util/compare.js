export const isEqualsSet = (a, b) => {
  return a.size === b.size && isContainsSet(isIn(b), a);
};

const isContainsSet = (a, b) => {
  for (const property of b) {
    if (!a(property)) return false;
  }
  return true;
};

const isIn = a => {
  return b => a.has(b);
};

export const isEqualsMap = (a, b) => {
  if (a.size !== b.size) return false;

  for (const [key, value] of a) {
    const tempValue = b.get(key);
    if(tempValue !== value || (tempValue === undefined && !b.has(key)))){
      return false;
    }
  }
  
  return true;
};
