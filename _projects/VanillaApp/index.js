(() => {
  window.addEventListener('scroll', () => {
    var windowTop = document.documentElement.scrollTop;
    windowTop > 100
      ? document.querySelector('nav').classList.add('navShadow')
      : document.querySelector('nav').classList.remove('navShadow');
    windowTop > 100
      ? (document.querySelector('ul').style.top = '90px')
      : (document.querySelector('ul').style.top = '120px');
  });

  document.querySelector('#logo').addEventListener('click', () => {
    location.replace('http://127.0.0.1:5500/_projects/VanillaApp/index.html');
  });

  document.querySelector('#menu-toggle').addEventListener('click', () => {
    document.querySelector('#menu-toggle').classList.toggle('closeMenu');
    document.querySelector('ul').classList.toggle('showMenu');

    document.querySelector('li').addEventListener('click', () => {
      document.querySelector('ul').removeClass('showMenu');
      document.querySelector('#menu-toggle').removeClass('closeMenu');
    });
  });
})();
