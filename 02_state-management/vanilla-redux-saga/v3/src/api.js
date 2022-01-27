export const getUser = async id => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const response = await res.json();
  return { id: response.id, name: response.name };
};
