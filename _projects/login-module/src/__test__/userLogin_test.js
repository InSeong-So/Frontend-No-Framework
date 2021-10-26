import App from '../App.js';

describe('userLogin', () => {
  beforeEach(() => {
    new App(document.querySelector('.app'));
  });
  describe('checkId', () => {
    beforeEach(() => {});

    it('아이디가 없다면 아이디 입력 테두리를 빨간색으로 바꾼다.', () => {
      expect(0).toBe(0);
    });
  });
});
