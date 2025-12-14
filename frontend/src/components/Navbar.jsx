import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="text-white text-xl font-bold hover:text-pink-200 transition"
            >
              🍬 Sweet Shop
            </Link>
            {user && (
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/dashboard"
                  className="text-white hover:text-pink-200 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-white hover:text-pink-200 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    Admin Panel
                  </Link>
                )}
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm">
                Welcome, <span className="font-semibold">{user.name}</span>
                {user.role === 'admin' && (
                  <span className="ml-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
                    ADMIN
                  </span>
                )}
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-pink-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-50 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-pink-200 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-pink-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-50 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

