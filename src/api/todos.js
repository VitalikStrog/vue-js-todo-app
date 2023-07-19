import { client } from '@/api/httpClient';

export const getTodos = () => {
  return client.get('/todos?userId=11035');
};

export const createTodos = (title) => {
  return client.post('/todos', {
    title,
    completed: false,
    userId: 11035,
  });
};

export const updateTodo = ({ id, title, completed }) => {
  return client.patch(`/todos/${id}`, {
    title,
    completed
  });
};

export const deleteTodo = (id) => {
  return client.delete(`/todos/${id}`);
};
