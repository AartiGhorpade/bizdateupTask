import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/css/navbar.css';

const Navbar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');

    // Update activeLink based on the current URL path
    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/add-task') {
            setActiveLink('addtask');
        } else if (currentPath === '/view-task') {
            setActiveLink('viewtask');
        }
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg bg-light navbar-light">
            <div className="container-fluid">
                <ul className="navbar-nav ms-auto me-5 gap-lg-5">
                    <li className="nav-item">
                        <Link
                            className={`nav-link p-2 ${activeLink === 'addtask' ? 'active' : ''}`}
                            to="/add-task"
                            onClick={() => setActiveLink('addtask')}
                        >
                            Add Task
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={`nav-link p-2 ${activeLink === 'viewtask' ? 'active' : ''}`}
                            to="/view-task"
                            onClick={() => setActiveLink('viewtask')}
                        >
                            View Task
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
