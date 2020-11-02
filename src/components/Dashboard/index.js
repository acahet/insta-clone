import React, { useEffect, useState } from 'react';
import { getPostFromDb } from '../../helpers/api';
import Header from '../Header';
import Post from '../Post';
import './styles.css';

function Dashboard() {
	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState(null);
	useEffect(() => {
		getPostFromDb('posts', setPosts);
	}, []);
	return (
		<>
			<div className="dashboard">
				<Header user={user} setUser={setUser} />

				{posts.length === 0 ? (
					<h2> no posts logged</h2>
				) : (
					posts.map(({ id, post }) => {
						console.log('id inside posts map is', id);
						const { postCaption, postImage, username } = post;

						return (
							<div key={id} className="dashboard__body">
								<Post
									postId={id}
									user={user}
									username={username}
									postImage={postImage}
									postCaption={postCaption}
								/>
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
