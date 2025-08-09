import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gradient-to-br from-blue-100 to-blue-200 text-gray-900 p-6 min-h-screen flex flex-col shadow-lg border-r border-blue-300">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-800">Task Manager</h1>
        {user && (
          <p className="mt-2 text-blue-600 text-sm">Welcome, {user.name}</p>
        )}
      </div>
      <nav className="flex-grow">
        <ul className="space-y-3">
          <li>
            <Link
              to="/"
              className={`block py-3 px-5 rounded-lg transition duration-200 ${
                isActive('/') ? 'bg-blue-300 font-semibold text-blue-900' : 'hover:bg-blue-200'
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/add-task"
              className={`block py-3 px-5 rounded-lg transition duration-200 ${
                isActive('/add-task') ? 'bg-blue-300 font-semibold text-blue-900' : 'hover:bg-blue-200'
              }`}
            >
              Add Task
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left py-3 px-5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
