import { createContext, useReducer } from 'react';
import axios from 'axios';
import githubReducer from './GIthubReducers';

const GithubContex = createContext();

const GITHUB_URL = 'https://api.github.com';

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
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
				SearchUsers,
				clearUsers,
			}}
		>
			{children}
		</GithubContex.Provider>
	);
};

export default GithubContex;
