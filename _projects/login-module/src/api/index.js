const baseUrl = 'http://localhost:3001';

// /login
async function userLogin(userId, password) {
  const parameters = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify({
      userId,
      password,
    }),
  };
  return await fetch(`${baseUrl}/login`, parameters);
}
// /check
async function userCheck(id) {
  return await fetch(`${baseUrl}/check?userId=${id}`);
}
// /signup
async function userSignup(userId, password) {
  const parameters = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      password,
    }),
  };
  return await fetch(`${baseUrl}/signup`, parameters);
}

export { userLogin, userCheck, userSignup };
