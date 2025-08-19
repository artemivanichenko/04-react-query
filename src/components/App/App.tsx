import { useEffect, useState } from "react";
import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";
import movieService from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useQuery } from "@tanstack/react-query";

function App() {
	// const [page,setPage]=useState<number>(1)

	const [query, setQuery] = useState<string>("");
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	const { data } = useQuery({
		queryKey: ["movies", { query }],
		queryFn: () => movieService(query),
		enabled: query !== "",
	});

	const handleSubmit = async (value: string): Promise<void> => {
		setQuery(value);
	};
	console.log(data);
	// const [query, setQuery] = useState("");
	// const [isLoading, setIsLoading] = useState(false);
	// const [isError, setIsError] = useState(false);

	// const handleSubmit = (query: string) => {
	// 	setQuery(query);
	// };

	const handleselectedMovie = (movie: Movie) => {
		setSelectedMovie(movie);
	};
	// const handleCloseModal = () => {
	// 	setSelectedMovie(null);
	// };

	// useEffect(() => {
	// 	if (!query) {
	// 		return;
	// 	}

	// 	const getMovies = async (): Promise<void> => {
	// 		setIsLoading(true);
	// 		setIsError(false);
	// 		try {
	// 			const resultData = await fetchMovies(query);
	// 			if (resultData?.results.length === 0) {
	// 				toast("No movies found for your request");
	// 				return;
	// 			}
	// 			setMovies(resultData.results);
	// 		} catch {
	// 			setIsError(true);
	// 		} finally {
	// 			setIsLoading(false);
	// 		}
	// 	};

	// 	getMovies();
	// }, [query]);

	return (
		<>
			<div className={css.app}>
				<SearchBar onSubmit={handleSubmit} />
				{/* <MovieGrid movies={movies} onSelect={handleselectedMovie} /> */}
				{/* <Toaster position="top-center" reverseOrder={false} />
				{isLoading && <Loader />}
				{isError && <ErrorMessage />}

				
				{selectedMovie && (
					<MovieModal onClose={handleCloseModal} movie={selectedMovie} />
				)} */}
			</div>
		</>
	);
}

export default App;
