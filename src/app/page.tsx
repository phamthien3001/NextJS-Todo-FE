// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { todoService } from './api/todoService';
import { Todo, TodoFormData } from './models/todo';
import { Container, Typography, Button, Box, Alert, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TodoList from './components/todo/TodoList';
import TodoForm from './components/todo/TodoForm';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    sortBy: 'id',
    sortDir: 'asc',
  });

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoService.getAll({
        page: pagination.page,
        size: pagination.size,
        sortBy: pagination.sortBy,
        sortDir: pagination.sortDir,
      });
      setTodos(response.content);
      setPagination(prev => ({
        ...prev,
        totalElements: response.totalElements,
      }));
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [pagination.page, pagination.size, pagination.sortBy, pagination.sortDir]);

  const handleCreate = () => {
    setCurrentTodo(null);
    setFormOpen(true);
  };

  const handleEdit = (todo: Todo) => {
    setCurrentTodo(todo);
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await todoService.delete(id);
      fetchTodos();
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await todoService.update(id, {
          title: todo.title,
          description: todo.description,
          completed
        });
        fetchTodos();
      }
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const handleSubmit = async (data: TodoFormData) => {
    try {
      if (currentTodo) {
        await todoService.update(currentTodo.id, data);
      } else {
        await todoService.create(data);
      }
      fetchTodos();
    } catch (err) {
      setError('Failed to save todo');
      console.error(err);
      throw err;
    }
  };

  const handlePageChange = (newPage: number, newSize: number) => {
    setPagination(prev => ({
      ...prev,
      page: newPage,
      size: newSize,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Todo App
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Add Todo
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TodoList
          todos={todos}
          totalElements={pagination.totalElements}
          page={pagination.page}
          size={pagination.size}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onPageChange={handlePageChange}
        />
      )}

      <TodoForm
        open={formOpen}
        todo={currentTodo}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}