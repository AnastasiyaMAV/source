import { Outlet, NavLink } from "react-router-dom";

function Header() {
    return (
        <>
            <ul className="header">
                <NavLink to="/" className="notActivLink" >Таблица студентов</NavLink>
                <NavLink to="/student" className="notActivLink">Добавление и удаление студента</NavLink>
            </ul>
            <Outlet />
        </>
    );
}

export default Header;