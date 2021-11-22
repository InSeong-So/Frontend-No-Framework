// // non-curring
// const createURL = (baseURL, path) => {
//   const protocol = 'https';
//   return `${protocol}://${baseURL}/${path}`;
// };

// // create URLs for our main site
// const homeURL = createURL('mysite.com', '');
// const loginURL = createURL('mysite.com', 'login');
// const productsURL = createURL('mysite.com', 'products');
// const contactURL = createURL('mysite.com', 'contact-us');

// // create URLs for our careers site
// const careersHomeURL = createURL('mysite-careers.com', '');
// const careersLoginURL = createURL('mysite-careers.com', 'login');

const createURL = baseURL => {
  const protocol = 'https';

  // we now return a function, that accepts a 'path' as an argument
  return path => {
    return `${protocol}://${baseURL}/${path}`;
  };
};

// we create a new functions with the baseURL value in it's closure scope
const createSiteURL = createURL('mysite.com');
const createCareersURL = createURL('mysite-careers.com');

// create URLs for our main site
const homeURL = createSiteURL('');
const loginURL = createSiteURL('login');
const productsURL = createSiteURL('products');
const contactURL = createSiteURL('contact-us');

// create URLs for our career site
const careersHomeURL = createCareersURL('');
const careersLoginURL = createCareersURL('login');
