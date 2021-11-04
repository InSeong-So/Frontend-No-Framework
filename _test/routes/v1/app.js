import Navigo from './src/index.js';

// getElementById wrapper
function $id(id) {
  return document.getElementById(id);
}

// asyncrhonously fetch the html template partial from the file directory,
// then set its contents to the html of the parent element
function loadHTML(url, id) {
  const req = new XMLHttpRequest();
  req.open('GET', `${url}.html`);
  req.send();
  req.onload = () => {
    $id(id).innerHTML = req.responseText;
  };
}

// use #! to hash
const router = new Navigo(null, false);
router.on({
  // 'view' is the id of the div element inside which we render the HTML
  firstroute: () => {
    loadHTML('./templates/first', 'view');
  },
  secondroute: () => {
    loadHTML('./templates/second', 'view');
  },
  thirdroute: () => {
    loadHTML('./templates/third', 'view');
  },
});

// set the default route
router.on(() => {
  $id('view').innerHTML = '<h2>Here by default</h2>';
});

// set the 404 route
router.notFound(() => {
  $id('view').innerHTML =
    "<h3>Couldn't find the page you're looking for...</h3>";
});

router.resolve();
