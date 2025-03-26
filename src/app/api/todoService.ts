import apiClient from './apiClient';
import { Todo, TodoFormData } from '../models/todo';

class TodoService {
  async getAll(): Promise<Todo[]> {
    const response = await apiClient.get('/todos');
    return response.data;
  }

  async getById(id: string): Promise<Todo> {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data;
  }

  async create(data: TodoFormData): Promise<Todo> {
    const response = await apiClient.post('/todos', data);
    return response.data;
  }

  async update(id: string, data: TodoFormData): Promise<Todo> {
    const response = await apiClient.put(`/todos/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/todos/${id}`);
  }
}

export const todoService = new TodoService();