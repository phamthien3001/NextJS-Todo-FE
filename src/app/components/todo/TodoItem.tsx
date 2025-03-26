'use client';

import { Todo } from '../../models/todo';
import { Checkbox, IconButton, ListItem, ListItemText, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
}

export default function TodoItem({ todo, onEdit, onDelete, onToggle }: TodoItemProps) {
  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" spacing={1}>
          <IconButton edge="end" onClick={() => onEdit(todo)}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" onClick={() => onDelete(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      }
    >
      <Checkbox
        checked={todo.completed}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
      />
      <ListItemText
        primary={todo.title}
        secondary={todo.description}
        sx={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'text.disabled' : 'text.primary'
        }}
      />
    </ListItem>
  );
}