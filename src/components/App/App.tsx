import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./App.module.css";

// import { useQuery } from "@tanstack/react-query";

function App() {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState<Movie[]>([]);
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	// const MoviesTanstack = () => {
	// 	const MyQuery = useQuery({
	// 		queryKey: ["movies"],
	// 		queryFn: () => {
	// 			console.log("fetch");
	// 		},
	// 	});
	// };

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
				if (resultData.results.length === 0) {
					toast("No movies found for your request");
					return;
				}
				setMovies(resultData.results);
			} catch {
				console.log("error");
				setIsError(true);
			} finally {
				console.log("return");
				setIsLoading(false);
			}
		};

		getMovies();
		return () => {
			setMovies([]);
		};
	}, [query]);

	return (
		<>
			<div className={css.app}>
				<SearchBar handleSubmit={handleSubmit} />
				{isLoading && <Loader />}
				{isError && <ErrorMessage />}
				<MovieGrid movies={movies} onClick={handleselectedMovie} />
				{selectedMovie && (
					<MovieModal
						handleCloseModal={handleCloseModal}
						selectedMovie={selectedMovie}
					/>
				)}
			</div>
		</>
	);
}

export default App;
