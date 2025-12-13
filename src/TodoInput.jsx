import React, { useState, useEffect } from "react";
import { Input, Button, Form } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

function TodoInput({ onAdd, editTask }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTask) {
      form.setFieldsValue({ text: editTask.text });
    } else {
      form.resetFields();
    }
  }, [editTask, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await onAdd(values.text);
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ width: '100%' }}
    >
      <Form.Item
        name="text"
        rules={[
          { required: true, message: 'Please enter a task!' },
          { max: 200, message: 'Task cannot exceed 200 characters!' }
        ]}
      >
        <Input 
          placeholder="What needs to be done?" 
          size="large"
          autoFocus
          prefix={editTask ? <EditOutlined /> : <PlusOutlined />}
        />
      </Form.Item>
      
      <Form.Item style={{ marginBottom: 0 }}>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading}
          icon={editTask ? <EditOutlined /> : <PlusOutlined />}
          block
          size="large"
        >
          {editTask ? "Update Task" : "Add New Task"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TodoInput;