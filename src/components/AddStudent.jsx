import { Card, Space, Input, Button, Radio } from "antd";
import React, { useState, useEffect } from "react";

function AddStudent() {
  const [student, setStudent] = useState({
    key: "",
    name: "",
    age: "",
    physics: "",
    informatics: "",
    chemistry: "",
    biology: "",
    story: "",
  });

  const [nameSt, setNameSt] = useState("");
  const [birthdaySt, setbirthdaySt] = useState("");
  const [okAdd, setOkAdd] = useState(false);
  const textWithPunc = /^[а-яё -.,_!?:;]+$/gi;
  const numberDate = /^[0-9.]+$/gi;
  const [errorValidationName, setErrorValidationName] = useState(false);
  const [errorValidationDate, setErrorValidationDate] = useState(false);

  const fieldСlearing = () => {
    setNameSt("");
    setbirthdaySt("");
  };

  const [invisibleAdd, setInvisibleAdd] = useState(true);
  let students = [];

  useEffect(() => {
    if (
      nameSt &&
      birthdaySt &&
      student.physics &&
      student.informatics &&
      student.chemistry &&
      student.biology &&
      student.story
    ) {
      setInvisibleAdd(false);
    } else {
      setInvisibleAdd(true);
    }
  }, [student, nameSt, birthdaySt]);

  const handleChangeNameSt = (e) => {
    if (e.target.value.match(textWithPunc)) {
      setNameSt(e.target.value);
      setStudent({ ...student, [e.target.name]: e.target.value });
      setOkAdd(false);
      setErrorValidationName(false);
    } else {
      setErrorValidationName(true);
    }
  };

  const handleChangeBirthdaySt = (e) => {
    if (e.target.value.match(numberDate)) {
      setbirthdaySt(e.target.value);
      setStudent({ ...student, [e.target.name]: e.target.value });
      setOkAdd(false);
      setErrorValidationDate(false);
    } else {
      setErrorValidationDate(true);
    }
  };

  const handleChangeScore = (e) => (field) => {
    setStudent({ ...student, [field]: e.target.value });
    setOkAdd(false);
  };

  const addStudent = () => {
    if (localStorage.getItem("students") != null) {
      students = JSON.parse(localStorage.getItem("students"));
      student.key = (students.length + 2).toString();
      students.push(student);
      localStorage.setItem("students", JSON.stringify(students));
      fieldСlearing();
      setInvisibleAdd(true);
      setOkAdd(true);
    } else {
      student.key = students.length + 2;
      students.push(student);
      localStorage.setItem("students", JSON.stringify(students));
      fieldСlearing();
      setInvisibleAdd(true);
      setOkAdd(true);
    }
  };

  return (
    <>
      <div className="containerStudent">
        <Card style={{ width: 300 }}>
          <div className="containerCard">
            <div className="inputName">
              <h3>Добавление нового студента</h3>
              <Input
                placeholder="Введите ФИО"
                onChange={handleChangeNameSt}
                name="name"
                value={nameSt}
              />
              {errorValidationName ? (
                <p className="error">Только кириллица</p>
              ) : (
                ""
              )}
            </div>
            <Space direction="vertical" className="inputName">
              <div>Введите дату рождения</div>
              <Input
                placeholder="Формат ГГГГ.ММ.ДД"
                onChange={handleChangeBirthdaySt}
                name="age"
                value={birthdaySt}
              />
              {errorValidationDate ? (
                <p className="error">Формат даты ГГГГ.ММ.ДД</p>
              ) : (
                ""
              )}
            </Space>
            <Card>
              <p>Введите оценки за предметы</p>
              <label>Физика</label>
              <Radio.Group
                onChange={(e) => handleChangeScore(e)("physics")}
                value={student.physics}
              >
                <Radio value={5}>5</Radio>
                <Radio value={4}>4</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={2}>2</Radio>
              </Radio.Group>

              <label>Информатика</label>
              <Radio.Group
                onChange={(e) => handleChangeScore(e)("informatics")}
                value={student.informatics}
              >
                <Radio checked={true} value={5}>
                  5
                </Radio>
                <Radio value={4}>4</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={2}>2</Radio>
              </Radio.Group>

              <label>Химия</label>
              <Radio.Group
                onChange={(e) => handleChangeScore(e)("chemistry")}
                value={student.chemistry}
              >
                <Radio value={5}>5</Radio>
                <Radio value={4}>4</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={2}>2</Radio>
              </Radio.Group>

              <label>Биология</label>
              <Radio.Group
                onChange={(e) => handleChangeScore(e)("biology")}
                value={student.biology}
              >
                <Radio value={5}>5</Radio>
                <Radio value={4}>4</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={2}>2</Radio>
              </Radio.Group>

              <label>История</label>
              <Radio.Group
                onChange={(e) => handleChangeScore(e)("story")}
                value={student.story}
              >
                <Radio value={5}>5</Radio>
                <Radio value={4}>4</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={2}>2</Radio>
              </Radio.Group>
            </Card>
            <Button type="primary" disabled={invisibleAdd} onClick={addStudent}>
              {" "}
              Добавить{" "}
            </Button>
            {okAdd ? (
              <div>
                <span>Студент добавлен!</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

export default AddStudent;
