export default container => {
  const home = () => {
    container.textContent = 'This is Home page';
  };

  const list = () => {
    container.textContent = 'This is List Page';
  };

  const notFound = () => {
    container.textContent = 'Page is Not Found';
  };

  const detail = ({ id }) => {
    container.textContent = `
      This is Detail Page with ID ${id}
    `;
  };

  const anotherDetail = ({ id, anotherId }) => {
    container.textContent = `
      This is anoter Detail Page with ID ${id}
      and AnotherId ${anotherId}
    `;
  };

  return { home, list, notFound, detail, anotherDetail };
};
