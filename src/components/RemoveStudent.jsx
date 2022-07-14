import React from "react";
import { Table, Popconfirm, Typography } from "antd";

const originData = require("./assets/JSON/originData.json");
const alphabetData = require("./assets/JSON/alphabetData.json");
const scoreData = require("./assets/JSON/scoreData.json");

class RemoveStudent extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "ФИО",
        dataIndex: "name",
        width: "25%",
        filters: alphabetData,
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.localeCompare(b.name),
        className: "styleTable",
      },
      {
        title: "Дата Рождения (гггг-мм-дд)",
        dataIndex: "age",
        width: "10%",
        sorter: {
          compare: (a, b) => new Date(a.age) - new Date(b.age),
          multiple: "",
        },
        className: "styleTable",
      },
      {
        title: "Физика",
        dataIndex: "physics",
        width: "10%",
        filters: scoreData,
        onFilter: (value, record) => record.physics.indexOf(value) === 0,
        sorter: (a, b) => a.physics - b.physics,
        className: "styleTable",
      },
      {
        title: "Информатика",
        dataIndex: "informatics",
        width: "10%",
        filters: scoreData,
        onFilter: (value, record) => record.informatics.indexOf(value) === 0,
        sorter: (a, b) => a.informatics - b.informatics,
        className: "styleTable",
      },
      {
        title: "Химия",
        dataIndex: "chemistry",
        width: "10%",
        filters: scoreData,
        onFilter: (value, record) => record.chemistry.indexOf(value) === 0,
        sorter: (a, b) => a.chemistry - b.chemistry,
        className: "styleTable",
      },
      {
        title: "Биология",
        dataIndex: "biology",
        width: "10%",
        filters: scoreData,
        onFilter: (value, record) => record.biology.indexOf(value) === 0,
        sorter: (a, b) => a.biology - b.biology,
        className: "styleTable",
      },
      {
        title: "История",
        dataIndex: "story",
        width: "10%",
        filters: scoreData,
        onFilter: (value, record) => record.story.indexOf(value) === 0,
        sorter: (a, b) => a.story - b.story,
        className: "styleTable",
      },
      {
        title: "",
        dataIndex: "operation",
        className: "styleTable",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Вы уверены в удалении?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <Typography.Link>Удалить</Typography.Link>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: JSON.parse(localStorage.getItem("students"))
        ? JSON.parse(localStorage.getItem("students"))
        : localStorage.setItem("students", JSON.stringify(originData)),
    };
  }

  componentDidUpdate() {
    localStorage.setItem("students", JSON.stringify(this.state.dataSource));
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
      <div className="containerRemove">
        <Table
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default RemoveStudent;
