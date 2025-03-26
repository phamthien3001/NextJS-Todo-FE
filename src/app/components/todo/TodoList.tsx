'use client';

import { Todo } from '../../models/todo';
import { List, ListItem, Paper } from '@mui/material';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
}

export default function TodoList({ todos, onEdit, onDelete, onToggle }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          <ListItem>No todos found</ListItem>
        </List>
      </Paper>
    );
  }

  return (
    <Paper elevation={3}>
      <List>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </List>
    </Paper>
  );
}