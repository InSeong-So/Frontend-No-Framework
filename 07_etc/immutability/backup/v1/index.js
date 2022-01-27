const state = {
  posts: [
    {
      id: 1,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 1,
          text: '와 정말 잘 읽었습니다.',
        },
      ],
    },
    {
      id: 2,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 2,
          text: '또 다른 댓글 어쩌고 저쩌고',
        },
      ],
    },
  ],
  selectedId: 1,
};

const createProxy = (base, parent) => {
  return base;
};

const compose = (base, recipe) => {
  // 이걸 거치고 나면 모든 객체는 복사가 되어 있어야 한다.
  const proxy = createProxy(base);
  // proxy는 base를 proxy화 한 객체다.
  return recipe(proxy);
};

/*
const nextState = produce(state, draft => {
  const post = draft.posts.find(post => post.id === 1);
  post.comments.push({
    id: 3,
    text: '와 정말 쉽다!',
  });
});
*/

const reducer = compose(state, draft => {
  const post = draft.posts.find(post => post.id === 1);
  post.comments.push({
    id: 3,
    text: '와 정말 쉽다!',
  });
});

console.log(reducer);
