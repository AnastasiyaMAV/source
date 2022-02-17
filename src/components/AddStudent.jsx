import { Card, Space, Input, Button } from 'antd';
import React, { useState, useEffect } from 'react';

function AddStudent() {
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
    const [okAdd, setOkAdd] = useState(false);
    
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
        if(nameSt && birthdaySt && physicsScore && 
            informaticsScore && chemistryScore && biologyScore && storyScore){                
                setInvisibleAdd(false);
                // console.log(student);                
        } else {
            setInvisibleAdd(true);
        }
    }, [student]);

    const handleChangeNameSt = (e) => {
        setNameSt(e.target.value);
        setStudent({...student, [e.target.name]: e.target.value});
        setOkAdd(false);
    }

    const handleChangeBirthdaySt = (e) => {
        setbirthdaySt(e.target.value);
        setStudent({...student, [e.target.name]: e.target.value});
        setOkAdd(false);
    }

    const handleChangePhysicsScore = (e) => {
        if(e.target.value > 5 || e.target.value < 2){
            alert('Значение не может быть больше 5 и меньше 2');
            setPhysicsScore('');
        }else{
            setPhysicsScore(e.target.value);
            setStudent({...student, [e.target.name]: e.target.value});
            setOkAdd(false);
        }
    }

    const handleChangeInformaticsScore = (e) => {
        if(e.target.value > 5 || e.target.value < 2){
            alert('Значение не может быть больше 5 и меньше 2');
            setInformaticsScore('');
        }else{
            setInformaticsScore(e.target.value);
            setStudent({...student, [e.target.name]: e.target.value});
            setOkAdd(false);
        }
    }

    const handleChangeChemistryScore = (e) => {
        if(e.target.value > 5 || e.target.value < 2){
            alert('Значение не может быть больше 5 и меньше 2');
            setChemistryScore('');
        }else{
            setChemistryScore(e.target.value);
            setStudent({...student, [e.target.name]: e.target.value});
            setOkAdd(false);
        }
    }

    const handleChangeBiologyScore = (e) => {
        if(e.target.value > 5 || e.target.value < 2){
            alert('Значение не может быть больше 5 и меньше 2');
            setBiologyScore('');
        }else{
            setBiologyScore(e.target.value);
            setStudent({...student, [e.target.name]: e.target.value});
            setOkAdd(false);
        }
    }

    const handleChangeStoryScore = (e) => {
        if(e.target.value > 5 || e.target.value < 2){
            alert('Значение не может быть больше 5 и меньше 2');
            setStoryScore('');
        }else{
            setStoryScore(e.target.value);
            setStudent({...student, [e.target.name]: e.target.value});
            setOkAdd(false);
        }
    }

    const addStudent = () => {
        if (localStorage.getItem('students') != null) {
            students = JSON.parse(localStorage.getItem('students'));
            student.key = (students.length + 1).toString();
            students.push(student);
            localStorage.setItem('students', JSON.stringify(students));
            fieldСlearing();
            setInvisibleAdd(true);
            setOkAdd(true);
        } else {
            student.key = students.length + 1;
            students.push(student);
            localStorage.setItem('students', JSON.stringify(students));
            fieldСlearing();
            setInvisibleAdd(true);
            setOkAdd(true);
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
                        <Input placeholder="Формат ГГГГ.ММ.ДД" onChange={handleChangeBirthdaySt} name='age' value={birthdaySt}/>
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
                    {
                        okAdd
                        ?<div><span>Студент добавлен!</span></div>
                        : ''
                    }
                </div>
            </Card>
            </div>
        </>

    );
}

export default AddStudent;