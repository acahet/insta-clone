import React, { useState, useEffect } from 'react';
import './styles.css';
import { Button, Input, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from '../../firebase';
const useStyles = makeStyles((theme) => ({
	paper: {
		position: '50vh',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(${top}%, ${left}%)`,
	};
}
function ModalComponent() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [openLoginModal, setOpenLoginModal] = useState(false);
	const [openSignUpModal, setOpenSignUpModal] = useState(false);
	const [user, setUser] = useState(null);
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	const handleSignIn = (e) => {
		e.preventDefault();
		auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error.message));
		setPassword('');
		setUsername('');
		setOpenLoginModal(false);
	};

	const handleSignUp = (e) => {
		e.preventDefault();
		auth.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.user.updateProfile({
					displayName: username,
				});
			})
			.catch((error) => alert(error.message));
		setEmail('');
		setPassword('');
		setUsername('');
		setOpenSignUpModal(false);
	};
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//user logged in
				setUser(authUser);
			} else {
				//user logged out
				setUser(null);
			}
		});
		return () => {
			//perform cleanup actions
			unsubscribe();
		};
	}, [user, username]);

	return (
		<div>
			<Modal
				open={openSignUpModal ? openSignUpModal : openLoginModal}
				onClose={() => {
					openSignUpModal ? setOpenSignUpModal(false) : setOpenLoginModal(false);
				}}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div style={modalStyle} className={classes.paper}>
					<form className="modal__signup">
						<img
							src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
							alt="instagram"
						/>
						<Input
							type="text"
							placeholder="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							style={{ display: openLoginModal ? 'none' : '' }}
						/>
						<Input
							type="email"
							placeholder="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							type="password"
							placeholder="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button type="submit" onClick={openSignUpModal ? handleSignUp : handleSignIn}>
							{openSignUpModal ? 'Register' : 'Login'}
						</Button>
					</form>
				</div>
			</Modal>
			{user ? (
				<Button onClick={() => auth.signOut()}>Logout</Button>
			) : (
				<>
					<Button
						onClick={() => {
							setOpenLoginModal(true);
						}}
					>
						Login
					</Button>

					<Button
						onClick={() => {
							setOpenSignUpModal(true);
						}}
					>
						Register
					</Button>
				</>
			)}
		</div>
	);
}

export default ModalComponent;
