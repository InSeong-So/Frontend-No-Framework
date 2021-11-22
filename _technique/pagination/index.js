import './assets/index.scss';

const initialState = {
  currentPage: 1,
  totalItemCount: 0,
  pagePerItemCount: 10,
};

const Pagination = (stateParameter = initialState) => {
  let state = { ...initialState, ...stateParameter };

  /**
   * from to
   *
   * @returns
   */
  const getDisplayPages = () => {
    const { currentPage } = state;
    let currentPages = Math.floor(currentPage / 10);
    if (currentPage !== 0 && currentPage % 10 === 0) currentPages -= 1;
    return [currentPages, currentPages * 10];
  };

  /**
   *
   * @returns
   */
  const getTotalPages = () => {
    const { totalItemCount, pagePerItemCount } = state;
    return Math.ceil(totalItemCount / pagePerItemCount);
  };

  /**
   *
   * @returns
   */
  const template = () => {
    let [startPage, finishPage] = getDisplayPages();
    startPage *= 10;
    let displayPages = finishPage - startPage;
    const totalPages = getTotalPages();
    if (!displayPages) displayPages = totalPages - startPage;
    if (displayPages > 10) displayPages = 10;
    const { currentPage, totalItemCount } = state;
    if (totalItemCount === 0 || currentPage > totalPages) return `<div></div>`;
    return `
      <nav aria-label="pagination">
        <ul class="pagination">
          ${
            currentPage > 1
              ? `<li><a><span aria-hidden="true">PREV</span></a>`
              : ''
          }
          ${Array.from({ length: displayPages })
            .map((_, index) => {
              const pageNumber = startPage + index + 1;
              if (pageNumber > totalPages) return;
              return `<li><a ${
                pageNumber === currentPage ? 'aria-current="page"' : ''
              }>${pageNumber}</a></li>`;
            })
            .join('')}
          ${
            currentPage !== totalPages
              ? `<li><a><span aria-hidden="true">NEXT</span></a></li>`
              : ''
          }
        </ul>
      </nav>
      `;
  };

  return {
    setState: newState => {
      state = { ...state, ...newState };
    },

    render: () => {
      return template();
    },
  };
};

const pagination = new Pagination({
  currentPage: 17,
  totalItemCount: 4753,
});
const html = pagination.render();
document.querySelector('.app').innerHTML = html;

pagination.setState({
  currentPage: 18,
});

const html2 = pagination.render();
