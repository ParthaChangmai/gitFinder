import { createContext, useReducer } from 'react';
import alertReducer from './AlertReducer';

const AlertContex = createContext();

export const AlertProvider = ({ children }) => {
	const initialState = null;

	const setAlert = (msg, type) => {
		dispatch({
			type: 'SET_ALERT',
			payload: { msg, type },
		});

		setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000);
	};

	const [state, dispatch] = useReducer(alertReducer, initialState);
	return (
		<AlertContex.Provider value={{ alert: state, setAlert }}>
			{children}
		</AlertContex.Provider>
	);
};

export default AlertContex;
