import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-3 mb-3">
            <Link
                className="navbar-brand"
                to="/"
            >
                Prueba
            </Link>
            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink
                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                        to="/products/getAll"
                    >
                        Productos
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                        to="/products/orders"
                    >
                        Ordenes
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};