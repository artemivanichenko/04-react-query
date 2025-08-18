import { useEffect, useState } from "react";
import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState<Movie[]>([]);
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleSubmit = (query: string) => {
		setQuery(query);
	};

	const handleselectedMovie = (movie: Movie) => {
		setSelectedMovie(movie);
	};
	const handleCloseModal = () => {
		setSelectedMovie(null);
	};

	useEffect(() => {
		if (!query) {
			return;
		}

		const getMovies = async (): Promise<void> => {
			setIsLoading(true);
			setIsError(false);
			try {
				const resultData = await fetchMovies(query);
				if (resultData?.results.length === 0) {
					toast("No movies found for your request");
					return;
				}
				setMovies(resultData.results);
			} catch {
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};

		getMovies();
	}, [query]);

	return (
		<>
			<div className={css.app}>
				<SearchBar onSubmit={handleSubmit} />
				<Toaster position="top-center" reverseOrder={false} />
				{isLoading && <Loader />}
				{isError && <ErrorMessage />}

				<MovieGrid movies={movies} onSelect={handleselectedMovie} />
				{selectedMovie && (
					<MovieModal onClose={handleCloseModal} movie={selectedMovie} />
				)}
			</div>
		</>
	);
}

export default App;
