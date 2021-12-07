export default class Controller {
  constructor(service, view) {
    this.service = service;
    this.view = view;

    this.service.bindUserListChanged(this.onUserListChanged);
    this.view.bindAddUser(this.handleAddUser);
    this.view.bindEditUser(this.handleEditUser);
    this.view.bindDeleteUser(this.handleDeleteUser);
    this.view.bindToggleUser(this.handleToggleUser);

    this.onUserListChanged(this.service.users);
  }

  onUserListChanged = users => {
    this.view.displayUsers(users);
  };

  handleAddUser = user => {
    this.service.add(user);
  };

  handleEditUser = (id, user) => {
    this.service.edit(id, user);
  };

  handleDeleteUser = id => {
    this.service.delete(id);
  };

  handleToggleUser = id => {
    this.service.toggle(id);
  };
}
