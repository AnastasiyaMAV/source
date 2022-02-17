import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';

const originData = require('./assets/JSON/originData.json');

const alphabetData = [
  { 'text': 'А', 'value': 'А' }, { 'text': 'Б', 'value': 'Б' }, { 'text': 'В', 'value': 'В' },{ 'text': 'Г', 'value': 'Г' },
  { 'text': 'Д', 'value': 'Д' },{ 'text': 'Е', 'value': 'Е' },{ 'text': 'Ё', 'value': 'Ё' },{ 'text': 'Ж', 'value': 'Ж' },
  { 'text': 'З', 'value': 'З' }, { 'text': 'И', 'value': 'И' }, { 'text': 'Й', 'value': 'Й' },{ 'text': 'К', 'value': 'К' },
  { 'text': 'Л', 'value': 'Л' },{ 'text': 'М', 'value': 'М' },{ 'text': 'Н', 'value': 'Н' },{ 'text': 'О', 'value': 'О' },
  { 'text': 'А', 'value': 'А' }, { 'text': 'Б', 'value': 'Б' }, { 'text': 'В', 'value': 'В' },{ 'text': 'Г', 'value': 'Г' },
  { 'text': 'П', 'value': 'П' },{ 'text': 'Р', 'value': 'Р' },{ 'text': 'С', 'value': 'С' },{ 'text': 'Т', 'value': 'Т' },
  { 'text': 'У', 'value': 'У' },{ 'text': 'Ф', 'value': 'Ф' },{ 'text': 'Х', 'value': 'Х' },{ 'text': 'Ц', 'value': 'Ц' },
  { 'text': 'Ч', 'value': 'Ч' },{ 'text': 'Ш', 'value': 'Ш' },{ 'text': 'Щ', 'value': 'Щ' },{ 'text': 'Э', 'value': 'Э' },
  { 'text': 'Ю', 'value': 'Ю' },{ 'text': 'Я', 'value': 'Я' }
]

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
              message: `Please Input ${title}!`,
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
  const [data, setData] = useState(originData);
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
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Дата Рождения',
      dataIndex: 'age',
      width: '10%',
      editable: true,
      sorter: {
        compare: (a, b) => a.age - b.age,
        multiple: '',
      },
    },
    {
      title: 'Физика',
      dataIndex: 'physics',
      width: '10%',
      editable: true,
      sorter: {
        compare: (a, b) => a.physics - b.physics,
        multiple: '',
      },
    },
    {
      title: 'Информатика',
      dataIndex: 'informatics',
      width: '10%',
      editable: true,
      sorter: {
        compare: (a, b) => a.informatics - b.informatics,
        multiple: '',
      },
    },
    {
      title: 'Химия',
      dataIndex: 'chemistry',
      width: '10%',
      editable: true,
      sorter: {
        compare: (a, b) => a.chemistry - b.chemistry,
        multiple: '',
      },
    },
    {
      title: 'Биология',
      dataIndex: 'biology',
      width: '10%',
      editable: true,
      sorter: {
        compare: (a, b) => a.biology - b.biology,
        multiple: '',
      },
    },
    {
      title: 'История',
      dataIndex: 'story',
      width: '10%',
      editable: true,
      sorter: {
        compare: (a, b) => a.story - b.story,
        multiple: '',
      },
    },
    {
      title: '',
      dataIndex: 'operation',
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
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
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