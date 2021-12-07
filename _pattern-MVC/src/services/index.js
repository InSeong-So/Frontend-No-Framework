import User from '../models/index.js';

export default class Service {
  constructor() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    this.users = users.map(user => new User(user));
  }

  bindUserListChanged(callback) {
    this.onUserListChanged = callback;
  }

  _commit(users) {
    this.onUserListChanged(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  add(user) {
    this.users.push(new User(user));

    this._commit(this.users);
  }

  edit(id, userToEdit) {
    this.users = this.users.map(user =>
      user.id === id
        ? new User({
            ...user,
            ...userToEdit,
          })
        : user,
    );

    this._commit(this.users);
  }

  delete(_id) {
    this.users = this.users.filter(({ id }) => id !== _id);

    this._commit(this.users);
  }

  toggle(_id) {
    this.users = this.users.map(user =>
      user.id === _id ? new User({ ...user, complete: !user.complete }) : user,
    );

    this._commit(this.users);
  }
}
