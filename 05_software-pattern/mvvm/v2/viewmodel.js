var ViewModel = (function () {
  var viewModel = function (model) {
    this.bind = function (view_element, model_element) {
      view_element.value = model.getCurrentValue(model_element);
      model.subscribe(function (attribute_name, newValue) {
        document.getElementsByName(attribute_name).forEach(function (elem) {
          elem.value = newValue;
        });
      });
      view_element.addEventListener('input', function () {
        model.setCurrentValue(view_element.name, view_element.value);
      });
    };
  };

  return viewModel;
})();
