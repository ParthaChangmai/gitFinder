import React, { useState, useContext } from 'react';
import GithubContex from '../../contex/github/GithubContex';
import AlertContex from '../../contex/alert/AlertContex';

function UserSearch() {
	const [text, setText] = useState('');

	const { users, SearchUsers, clearUsers } = useContext(GithubContex);
	const { setAlert } = useContext(AlertContex);

	const handleChange = (e) => setText(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (text === '') {
			setAlert('enter something', 'light');
		} else {
			SearchUsers(text);
			setText('');
		}
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 mb-8 gap-8">
			<div>
				<form onSubmit={handleSubmit}>
					<div className="form-control">
						<div className="relative">
							<input
								type="text"
								placeholder="Search"
								className="w-full pr-40 bg-gray-200 input input-lg text-black"
								value={text}
								onChange={handleChange}
							/>
							<button
								type="submit"
								className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
							>
								Go
							</button>
						</div>
					</div>
				</form>
			</div>
			{users.length > 0 && (
				<div>
					<button className="btn btn-ghost btn-lg" onClick={clearUsers}>
						Clear
					</button>
				</div>
			)}
		</div>
	);
}

export default UserSearch;
