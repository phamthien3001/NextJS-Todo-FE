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

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getAll();
      setTodos(data);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggle={handleToggle}
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