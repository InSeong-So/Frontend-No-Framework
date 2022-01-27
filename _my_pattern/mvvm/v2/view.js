var firstname_input = document.getElementById('firstname');
var lastname_input = document.getElementById('lastname');

var firstname_label = document.getElementById('firstname_label');
var lastname_label = document.getElementById('lastname_label');

var vm = new ViewModel(Model);
vm.bind(firstname_input, 'firstname');
vm.bind(lastname_input, 'lastname');

vm.bind(firstname_label, 'firstname');
vm.bind(lastname_label, 'lastname');
