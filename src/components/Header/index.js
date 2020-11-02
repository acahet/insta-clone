import React from 'react';
import './styles.css';

import ModalComponent from '../Modal';

function Header({ user, setUser }) {
	return (
		<div className="header">
			<img
				className="header__image"
				src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
				alt="instagram-clone"
			/>
			<div className="header__modal">
				<ModalComponent user={user} setUser={setUser} />
			</div>
		</div>
	);
}

export default Header;
