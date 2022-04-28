import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import User from './pages/User';
import { GithubProvider } from './contex/github/GithubContex';
import { AlertProvider } from './contex/alert/AlertContex';

function App() {
	return (
		<GithubProvider>
			<AlertProvider>
				<BrowserRouter className="App">
					<div className="flex flex-col justify-between h-screen text-white">
						<Navbar />
						<Alert />
						<main className="container mx-auto px-4 pb-12">
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/about" element={<About />} />
								<Route path="/user/:login" element={<User />} />
								<Route path="/notfound" element={<NotFound />} />
								<Route path="/*" element={<NotFound />} />
							</Routes>
						</main>
						<Footer />
					</div>
				</BrowserRouter>
			</AlertProvider>
		</GithubProvider>
	);
}

export default App;
