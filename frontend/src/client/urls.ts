const scheme = 'http';
const host = 'localhost';
const port = 3000;
const baseUrl = `${scheme}://${host}:${port}/api`;

export default {
  todos: `${baseUrl}/todos`,
};
