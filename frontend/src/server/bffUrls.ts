const scheme = 'http';
const host = 'localhost';
const port = 7071;
const baseUrl = `${scheme}://${host}:${port}/api`;

export default {
  todos: `${baseUrl}/todos`,
};
