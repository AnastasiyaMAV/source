import { Outlet, NavLink } from "react-router-dom";

function Header() {
    return (
        <>
            <ul className="header">
                <NavLink to="/"><img src='./assets/images/icon-open-book.png' alt="logo" className="logoImg" 
                    title="Urheberschaft: https://www.flaticon.com/ru/"/></NavLink>
                <NavLink to="/" className="notActivLink" >Таблица студентов</NavLink>
                <NavLink to="/studentAdd" className="notActivLink">Добавление студента</NavLink>
                <NavLink to="/studentDel" className="notActivLink">Удаление студента</NavLink>
            </ul>
            <Outlet />
        </>
    );
}

export default Header;