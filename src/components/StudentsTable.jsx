import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';

const originData = require('./assets/JSON/originData.json');
const alphabetData = require('./assets/JSON/alphabetData.json');
const scoreData = require('./assets/JSON/scoreData.json');

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Поле ${title} не должно быть пустым !`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const StudentsTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(JSON.parse(localStorage.getItem('students')) 
    ? JSON.parse(localStorage.getItem('students')) 
    : localStorage.setItem('students', JSON.stringify(originData)));
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      physics: '',
      informatics: '',
      chemistry: '',
      biology: '',
      story: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  useEffect(()=>{
    localStorage.setItem('students', JSON.stringify(data))
  },[data])

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'ФИО',
      dataIndex: 'name',
      width: '25%',
      editable: true,
      filters: alphabetData,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name),
      className: 'styleTable',
    },{
      title: 'Дата Рождения (гггг-мм-дд)',
      dataIndex: 'age',
      width: '10%',
      inputType: 'date',
      editable: true,
      sorter: {
        compare: (a, b) => new Date(a.age) - new Date(b.age),
        multiple: '',
      },
      className: 'styleTable',
    },{
      title: 'Физика',
      dataIndex: 'physics',
      width: '10%',
      editable: true,
      filters: scoreData,
      onFilter: (value, record) => record.physics.indexOf(value) === 0,
      sorter: (a, b) => a.physics - b.physics,
      className: 'styleTable',
    },{
      title: 'Информатика',
      dataIndex: 'informatics',
      width: '10%',
      editable: true,
      filters: scoreData,
      onFilter: (value, record) => record.informatics.indexOf(value) === 0,
      sorter: (a, b) => a.informatics - b.informatics,
      className: 'styleTable',
    },{
      title: 'Химия',
      dataIndex: 'chemistry',
      width: '10%',
      editable: true,
      filters: scoreData,
      onFilter: (value, record) => record.chemistry.indexOf(value) === 0,
      sorter: (a, b) => a.chemistry - b.chemistry,
      className: 'styleTable',
    },{
      title: 'Биология',
      dataIndex: 'biology',
      width: '10%',
      editable: true,
      filters: scoreData,
      onFilter: (value, record) => record.biology.indexOf(value) === 0,
      sorter: (a, b) => a.biology - b.biology,
      className: 'styleTable',
    },{
      title: 'История',
      dataIndex: 'story',
      width: '10%',
      editable: true,
      filters: scoreData,
      onFilter: (value, record) => record.story.indexOf(value) === 0,
      sorter: (a, b) => a.story - b.story,
      className: 'styleTable',
    },{
      title: '',
      dataIndex: 'operation',
      className: 'styleTable',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              OK
            </Typography.Link>
            <Popconfirm title="Вы уверены, что хотите отменить?" onConfirm={cancel}>
              <a>Отмена</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Редактирование
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'name' ? 'text' : 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (    
    <div className='containerTable'>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default StudentsTable;