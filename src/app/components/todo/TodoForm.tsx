'use client';

import { Todo, TodoFormData } from '../../models/todo';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel,
  Box
} from '@mui/material';
import { useState, useEffect } from 'react';

interface TodoFormProps {
  open: boolean;
  todo?: Todo | null;
  onClose: () => void;
  onSubmit: (data: TodoFormData) => Promise<void>;
}

export default function TodoForm({ open, todo, onClose, onSubmit }: TodoFormProps) {
  const [formData, setFormData] = useState<TodoFormData>({
    title: '',
    description: '',
    completed: false
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description || '',
        completed: todo.completed
      });
    } else {
      setFormData({
        title: '',
        description: '',
        completed: false
      });
    }
  }, [todo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{todo ? 'Edit Todo' : 'Create Todo'}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
              />
            }
            label="Completed"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {todo ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}