import React, { useEffect, useState } from 'react';
import { getPostFromDb } from '../../helpers/api';
import Header from '../Header';
import Post from '../Post';
import './styles.css';

function Dashboard() {
	const [posts, setPosts] = useState([]);
	// const [user, setUser] = useState(null);
	useEffect(() => {
		getPostFromDb('posts', setPosts);
	}, []);
	return (
		<>
			<div className="dashboard">
				<Header />

				{posts.length === 0 ? (
					<h2> no posts logged</h2>
				) : (
					posts.map(({ id, post }) => {
						const { postCaption, postImage, username } = post;

						return (
							<div key={id} className="dashboard__body">
								<Post username={username} postImage={postImage} postCaption={postCaption} />
							</div>
						);
					})
				)}
				{/* <div> */}
				{/* <ImageUpload username={username.displayName} /> */}
				{/* </div> */}
			</div>
		</>
	);
}

export default Dashboard;
