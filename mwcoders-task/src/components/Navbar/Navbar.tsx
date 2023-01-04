import { Link } from 'react-router-dom';
import './Navbar.scss';

const linkStyle = {
  textDecoration: 'none',
  color: '#ffffff',
};

export const Navbar = () => {
  return (
    <div className='nav'>
      <Link style={linkStyle} to='mwcoders-task'>
        <button className='btn'>Main Page</button>
      </Link>
      <Link style={linkStyle} to='mwcoders-task/calculator'>
        <button className='btn'>Calculator</button>
      </Link>
    </div>
  );
};
