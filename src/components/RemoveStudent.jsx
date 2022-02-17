import React from 'react';
import { Table, Popconfirm } from 'antd';
const originData = require('./assets/JSON/originData.json');

class RemoveStudent extends React.Component {
  
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'ФИО',
        dataIndex: 'name',
        width: '25%',
      },
      {
        title: 'Дата Рождения',
        dataIndex: 'age',
        width: '10%',
        sorter: {
          compare: (a, b) => a.age - b.age,
          multiple: '',
        },
      },
      {
        title: 'Физика',
        dataIndex: 'physics',
        width: '10%',
        sorter: {
          compare: (a, b) => a.physics - b.physics,
          multiple: '',
        },
      },
      {
        title: 'Информатика',
        dataIndex: 'informatics',
        width: '10%',
        sorter: {
          compare: (a, b) => a.informatics - b.informatics,
          multiple: '',
        },
      },
      {
        title: 'Химия',
        dataIndex: 'chemistry',
        width: '10%',
        sorter: {
          compare: (a, b) => a.chemistry - b.chemistry,
          multiple: '',
        },
      },
      {
        title: 'Биология',
        dataIndex: 'biology',
        width: '10%',
        sorter: {
          compare: (a, b) => a.biology - b.biology,
          multiple: '',
        },
      },
      {
        title: 'История',
        dataIndex: 'story',
        width: '10%',
        sorter: {
          compare: (a, b) => a.story - b.story,
          multiple: '',
        },
      },
      {
        title: '',
        dataIndex: 'operation',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Вы уверены в удалении?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Удалить</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: 
      JSON.parse(localStorage.getItem('students')) ? JSON.parse(localStorage.getItem('students')) : originData,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };


  render() {
    const { dataSource } = this.state;

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div className='containerTable'>

        <Table
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default RemoveStudent;