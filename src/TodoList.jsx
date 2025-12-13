import React from 'react';
import { List, Empty, Alert } from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  InboxOutlined 
} from '@ant-design/icons';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onEdit, onDelete, filter }) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === "done") return todo.completed;
    if (filter === "todo") return !todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <Empty
        image={<InboxOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />}
        imageStyle={{ height: 80 }}
        description={
          <span style={{ color: '#8c8c8c' }}>
            No {filter === 'all' ? '' : filter} tasks found
          </span>
        }
        style={{ 
          margin: '40px 0',
          padding: '40px 0'
        }}
      >
        {filter === 'done' && (
          <Alert
            message="No completed tasks yet"
            description="Complete some tasks to see them here!"
            type="info"
            showIcon
            style={{ maxWidth: 400, margin: '0 auto' }}
          />
        )}
      </Empty>
    );
  }

  return (
    <List
      dataSource={filteredTodos}
      renderItem={(todo) => (
        <List.Item key={todo.id} style={{ padding: '4px 0' }}>
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </List.Item>
      )}
      locale={{ emptyText: 'No tasks' }}
    />
  );
};

export default TodoList;