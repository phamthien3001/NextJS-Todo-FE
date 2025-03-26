// src/app/components/todo/TodoList.tsx
'use client';

import { Todo } from '../../models/todo';
import { List, Paper, TablePagination, Typography } from '@mui/material';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  totalElements: number;
  page: number;
  size: number;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
  onPageChange: (page: number, size: number) => void;
}

export default function TodoList({
  todos,
  totalElements,
  page,
  size,
  onEdit,
  onDelete,
  onToggle,
  onPageChange,
}: TodoListProps) {
  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage, size);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPageChange(0, parseInt(event.target.value, 10));
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
      {todos.length === 0 ? (
        <Typography variant="body1" sx={{ p: 2 }}>
          No todos found
        </Typography>
      ) : (
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
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalElements}
        rowsPerPage={size}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}