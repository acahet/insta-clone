import React, { useEffect, useState } from 'react';
import { getPostFromDb } from '../../helpers/api';
import Header from '../Header';
import Post from '../Post';
import './styles.css';

function Dashboard() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPostFromDb('posts', setPosts);
	}, []);
	return (
		<>
			<div className="dashboard">
				<Header />

				{/* //https://www.youtube.com/watch?v=f7T48W0cwXM&list=PL-J2q3Ga50oMQa1JdSJxYoZELwOJAXExP&index=3 */}
				{posts.map(({ id, post }) => {
					const { postCaption, postImage, username } = post;
					console.log(' POST ', post);
					return (
						<div key={id} className="dashboard__body">
							<Post username={username} postImage={postImage} postCaption={postCaption} />
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Dashboard;
