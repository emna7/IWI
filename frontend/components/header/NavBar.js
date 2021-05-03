import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <ul>
      <li>
        <Link to="/event">Event</Link>
      </li>
      <li>
	<Link to="/club">Club</Link>
      </li>
      <li>
	<Link to="/sign">Sign</Link>
      </li>
    </ul>
  );
}

export default NavBar;
