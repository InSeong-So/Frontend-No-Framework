var Model = (function () {
  var model = function () {
    var _model = {
      firstname: 'dzdzdd',
      lastname: 'Doe',
    };

    var listeners = [];

    this.subscribe = function (listener) {
      listeners.push(listener);
    };

    this.notify = function (attribute_name, newValue) {
      for (var i = 0; i < listeners.length; i++) {
        listeners[i](attribute_name, newValue);
      }
    };

    this.getCurrentValue = function (attribute_name) {
      console.log(_model[attribute_name]);
      return _model[attribute_name];
    };

    this.setCurrentValue = function (attribute_name, value) {
      _model[attribute_name] = value;
      this.notify(attribute_name, value);
    };
  };

  return new model();
})();
