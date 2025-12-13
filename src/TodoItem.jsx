import React from 'react';
import { Card, Checkbox, Button, Space, Tag, Tooltip } from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined 
} from '@ant-design/icons';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "No date";
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card
      size="small"
      style={{ 
        marginBottom: 16,
        borderLeft: `4px solid ${todo.completed ? '#52c41a' : '#1890ff'}`,
        opacity: todo.completed ? 0.8 : 1
      }}
      bodyStyle={{ padding: '12px 16px' }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Checkbox 
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            style={{ marginRight: 12 }}
          >
            <span style={{
              fontSize: '14px',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#8c8c8c' : '#262626',
              fontWeight: todo.completed ? 'normal' : 500
            }}>
              {todo.text}
            </span>
          </Checkbox>
        </div>

        <Space size="small" style={{ marginLeft: 16 }}>
          <Tooltip title="Created date">
            <Tag icon={<CalendarOutlined />} color="default">
              {formatDate(todo.id)}
            </Tag>
          </Tooltip>
          
          <Tooltip title="Status">
            <Tag 
              icon={todo.completed ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
              color={todo.completed ? "success" : "processing"}
            >
              {todo.completed ? "Done" : "In Progress"}
            </Tag>
          </Tooltip>

          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(todo)}
              size="small"
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(todo.id)}
              size="small"
            />
          </Tooltip>
        </Space>
      </div>
    </Card>
  );
};

export default TodoItem;