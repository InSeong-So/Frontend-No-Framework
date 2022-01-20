import utils from '../utils/index.js';

export default class View {
  constructor() {
    this.app = utils.$('.app');

    this.form = this.createElement('form');
    this.createInput({
      key: 'inputUserName',
      type: 'text',
      placeholder: 'UserName',
      name: 'name',
    });
    this.createInput({
      key: 'inputUserId',
      type: 'text',
      placeholder: 'UserId',
      name: 'userId',
    });

    this.submitButton = this.createElement('button');
    this.submitButton.textContent = 'Submit';

    this.form.append(this.inputUserName, this.inputUserId, this.submitButton);

    this.title = this.createElement('h1');
    this.title.textContent = 'Users';
    this.userList = this.createElement('ul', 'user-list');
    this.app.append(this.title, this.form, this.userList);

    this._temporaryAgeText = '';
    this._initLocalListeners();
  }

  get _nameText() {
    return this.inputUserName.value;
  }
  get _ageText() {
    return this.inputUserId.value;
  }

  _resetInput() {
    this.inputUserName.value = '';
    this.inputUserId.value = '';
  }

  createInput(
    { key, type, placeholder, name } = {
      key: 'default',
      type: 'text',
      placeholder: 'default',
      name: 'default',
    },
  ) {
    this[key] = this.createElement('input');
    this[key].type = type;
    this[key].placeholder = placeholder;
    this[key].name = name;
  }

  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  displayUsers(users) {
    // Delete all nodes
    while (this.userList.firstChild) {
      this.userList.removeChild(this.userList.firstChild);
    }

    // Show default message
    if (users.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'Nothing to do! Add a user?';
      this.userList.append(p);
    } else {
      // Create nodes
      users.forEach(user => {
        const li = this.createElement('li');
        li.id = user.id;

        const checkbox = this.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = user.complete;

        const spanUser = this.createElement('span');

        const spanAge = this.createElement('span');
        spanAge.contentEditable = true;
        spanAge.classList.add('editable');

        if (user.complete) {
          const strikeName = this.createElement('s');
          strikeName.textContent = user.name;
          spanUser.append(strikeName);

          const strikeAge = this.createElement('s');
          strikeAge.textContent = user.userId;
          spanAge.append(strikeAge);
        } else {
          spanUser.textContent = user.name;
          spanAge.textContent = user.userId;
        }

        const deleteButton = this.createElement('button', 'delete');
        deleteButton.textContent = 'Delete';
        li.append(checkbox, spanUser, spanAge, deleteButton);

        // Append nodes
        this.userList.append(li);
      });
    }
  }

  _initLocalListeners() {
    this.userList.addEventListener('input', event => {
      if (event.target.className === 'editable') {
        this._temporaryAgeText = event.target.innerText;
      }
    });
  }

  bindAddUser(handler) {
    this.form.addEventListener('submit', event => {
      event.preventDefault();

      if (this._nameText) {
        handler({
          name: this._nameText,
          userId: this._ageText,
        });
        this._resetInput();
      }
    });
  }

  bindDeleteUser(handler) {
    this.userList.addEventListener('click', event => {
      if (event.target.className === 'delete') {
        const id = event.target.parentElement.id;

        handler(id);
      }
    });
  }

  bindEditUser(handler) {
    this.userList.addEventListener('focusout', event => {
      if (this._temporaryAgeText) {
        const id = event.target.parentElement.id;
        const key = 'userId';

        handler(id, { [key]: this._temporaryAgeText });
        this._temporaryAgeText = '';
      }
    });
  }

  bindToggleUser(handler) {
    this.userList.addEventListener('change', event => {
      if (event.target.type === 'checkbox') {
        const id = event.target.parentElement.id;

        handler(id);
      }
    });
  }
}
