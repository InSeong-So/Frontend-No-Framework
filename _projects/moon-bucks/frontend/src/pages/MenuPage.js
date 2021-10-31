import MenuForm from '../components/MenuForm.js';

export default target => {
  const template = () => {
    return `
    <div id="app" class="px-4"></div>
    `;
  };

  const render = target => {
    target.innerHTML = template();
  };

  render(target);

  new MenuForm(document.querySelector('#app'));
};
