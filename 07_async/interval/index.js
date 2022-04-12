const timer = ms => new Promise(res => setTimeout(res, ms));

async function load() {
  let i = 5;
  while (i > 0) {
    console.log(i);
    await timer(1000);
    i--;
  }
  console.log('end');
}

// load();

const $intervalButton = document.getElementById('interval-button');
$intervalButton.addEventListener('click', () => window.requestAnimationFrame(load));

// !(function () {
//   let start = new Date().getTime();
//   let i = 1;
//   let callback = function () {
//     let ts = new Date().getTime();
//     if (ts - 1000 > start) {
//       // console.log('End');
//     } else {
//       console.log(i++, ts);
//       requestAnimationFrame(callback);
//     }
//   };
//   requestAnimationFrame(callback);
// })();
