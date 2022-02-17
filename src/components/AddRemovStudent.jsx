import { Card, DatePicker, Space, Input, Button } from 'antd';
import React, { useState, useEffect } from 'react';

function StudentsTable() {
    const [student, setStudent] = useState({
        key: '',
        name: '',
        age: '',
        physics: '',
        informatics: '',
        chemistry: '',
        biology: '',
        story: ''
    });

    const [nameSt, setNameSt] = useState('');
    const [birthdaySt, setbirthdaySt] = useState('');
    const [physicsScore, setPhysicsScore] = useState('');
    const [informaticsScore, setInformaticsScore] = useState('');
    const [chemistryScore, setChemistryScore] = useState('');
    const [biologyScore, setBiologyScore] = useState('');
    const [storyScore, setStoryScore] = useState('');
    
    const fieldСlearing = () => {
        setNameSt('');
        setbirthdaySt('');
        setPhysicsScore('');
        setInformaticsScore('');
        setChemistryScore('');
        setBiologyScore('');
        setStoryScore('');
    };

    const [invisibleAdd, setInvisibleAdd] = useState(true);
    let students = [];

    

    useEffect(() => {
        if(student.name && student.age && student.physics && 
            student.informatics && student.chemistry && student.biology && student.story){                
                setInvisibleAdd(false);
                console.log(student);                
        } else {
            setInvisibleAdd(true);
        }
    }, [student]);

    const handleChangeNameSt = (e) => {
        setNameSt(e.target.value);
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const handleChangeBirthdaySt = (e) => {
        setbirthdaySt(e.target.value);
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const handleChangePhysicsScore = (e) => {
        setPhysicsScore(e.target.value);
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const handleChangeInformaticsScore = (e) => {
        setInformaticsScore(e.target.value);
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const handleChangeChemistryScore = (e) => {
        setChemistryScore(e.target.value);
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const handleChangeBiologyScore = (e) => {
        setBiologyScore(e.target.value);
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const handleChangeStoryScore = (e) => {
        setStoryScore(e.target.value);
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const addStudent = () => {
        // console.log('42');
        if (localStorage.getItem('students') != null) {
            students = JSON.parse(localStorage.getItem('students'));
            student.key = students.length + 1;
            students.push(student);
            localStorage.setItem('students', JSON.stringify(students));
            fieldСlearing();
            setInvisibleAdd(true);
            // console.log('45');
        } else {
            student.key = students.length + 1;
            students.push(student);
            localStorage.setItem('students', JSON.stringify(students));
            fieldСlearing();
            setInvisibleAdd(true);
            // console.log('49');
        } 
    }

    return (
        <>
            <div className="containerStudent">
            <Card style={{ width: 300 }}>
                <div className='containerCard'>
                    <div>
                        <h3>Добавление нового студента</h3>
                        <Input placeholder="Введите ФИО" onChange={handleChangeNameSt} name='name' value={nameSt}/>
                    </div>
                    <Space direction="vertical">
                        <div>Введите дату рождения</div>
                        {/* <DatePicker onChange={onChange} /> */}
                        <Input placeholder="Формат 12.12.1912" onChange={handleChangeBirthdaySt} name='age' value={birthdaySt}/>
                    </Space>
                    <Card>
                        <p>Введите оценки за предметы</p>
                        <Input placeholder="Физика" type='number' onChange={handleChangePhysicsScore} name='physics' value={physicsScore}/>
                        <Input placeholder="Информатика" type='number' onChange={handleChangeInformaticsScore} name='informatics' value={informaticsScore}/>
                        <Input placeholder="Химия" type='number' onChange={handleChangeChemistryScore} name='chemistry' value={chemistryScore}/>
                        <Input placeholder="Биология" type='number' onChange={handleChangeBiologyScore} name='biology' value={biologyScore}/>
                        <Input placeholder="История" type='number' onChange={handleChangeStoryScore} name='story' value={storyScore}/>
                    </Card>
                    <Button type="primary" disabled={invisibleAdd} onClick={addStudent}> Добавить </Button>
                </div>

            </Card>
            </div>
        </>

    );
}

export default StudentsTable;