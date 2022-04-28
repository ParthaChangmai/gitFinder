import { createContext, useReducer } from 'react';
import axios from 'axios';
import githubReducer from './GIthubReducers';

const GithubContex = createContext();

const GITHUB_URL = 'https://api.github.com';

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		user: {},
		loading: false,
	};
	const [state, dispatch] = useReducer(githubReducer, initialState);

	const SearchUsers = async (text) => {
		setLoading();

		const res = await axios.get(`${GITHUB_URL}/search/users?q=${text}`);
		dispatch({
			type: 'GET_USERS',
			payload: res.data.items,
		});
	};
	//Get Users
	const getUser = async (login) => {
		setLoading();

		const res = await axios.get(`${GITHUB_URL}/users/${login}`);

		dispatch({
			type: 'GET_USER',
			payload: res.data,
		});
	};

	const getRepos = async (login) => {
		setLoading();

		const res = await axios.get(`${GITHUB_URL}/users/${login}/repos`);

		dispatch({
			type: 'GET_REPOS',
			payload: res.data,
		});
	};

	//clear users
	const clearUsers = () => {
		dispatch({
			type: 'CLEAR_USERS',
		});
	};
	//set loading
	const setLoading = () =>
		dispatch({
			type: 'SET_LOADING',
		});

	return (
		<GithubContex.Provider
			value={{
				users: state.users,
				loading: state.loading,
				user: state.user,
				repos: state.repo,
				SearchUsers,
				clearUsers,
				getUser,
				getRepos,
			}}
		>
			{children}
		</GithubContex.Provider>
	);
};

export default GithubContex;
