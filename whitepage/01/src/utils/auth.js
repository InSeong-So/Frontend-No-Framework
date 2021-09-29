export const setCookie = (name, value, exp) => {
  const date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

export const getCookie = name => {
  const cookie = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return cookie ? cookie[2] : null;
};
