// For load validator and require in test file.
// NOTE: Comment below lines, if you using es6 module.
(function (root, factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.validator = factory();
  }
}(this, function () {
  // implement code here
  const validator = {
    isNumber(a) {
      return typeof a === 'number';
    }
  };

  return validator;
}));

// NOTE: Uncomment below lines, if you using es6 module.
// export default {
//   isNumber(a) {
//     return typeof a === 'number'
//   }
// }
