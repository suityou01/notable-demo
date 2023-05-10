const scheme = 'http';
const host = process.env.BACKEND_HOST || 'localhost';
const port = 7071;
const baseUrl = `${scheme}://${host}:${port}/api`;

export default {
  todos: `${baseUrl}/todos`,
  todo: `${baseUrl}/todo`,
};
