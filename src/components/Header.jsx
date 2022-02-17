import { Outlet, NavLink } from "react-router-dom";

function Header() {
    return (
        <>
            <ul className="header">
                <NavLink to="/" className="notActivLink" >Таблица студентов</NavLink>
                <NavLink to="/studentAdd" className="notActivLink">Добавление студента</NavLink>
                <NavLink to="/studentDel" className="notActivLink">Удаление студента</NavLink>
            </ul>
            <Outlet />
        </>
    );
}

export default Header;