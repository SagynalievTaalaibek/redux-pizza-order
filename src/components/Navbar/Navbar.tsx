import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../../store/admin/adminSlice';

const Navbar = () => {
  const adminLink = ['Dishes', 'Orders'];
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <nav className="navbar navbar-expand-lg text-dark">
      <div className="container">
        <span className="navbar-brand">Turtle Pizza {isAdmin && ' Admin'}</span>
        {isAdmin && (
          <>
            <ul className="navbar-nav flex-row gap-2 flex-nowrap me-auto">
              {adminLink.map((link) => (
                <li className="nav-item" key={link}>
                  <NavLink
                    to={`/admin/${link.toLowerCase()}`}
                    className={({ isActive, isPending }) =>
                      `nav-link ${
                        isPending ? 'pending' : isActive ? 'active' : ''
                      }`
                    }
                  >
                    {link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;