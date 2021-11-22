const request1 = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve('data');
    }, 3000);
  });

const request2 = str =>
  new Promise(() => {
    setTimeout(() => {
      console.log(str);
    }, 1000);
  });

(async () => {
  const response = await request1();
  await request2(response);
})();
