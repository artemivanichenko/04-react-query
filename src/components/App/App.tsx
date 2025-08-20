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
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

function App() {
	// const [page,setPage]=useState<number>(1)

	const [query, setQuery] = useState<string>("");
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	const [page, setPage] = useState<number>(1);

	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ["movies", { query, page }],
		queryFn: () => movieService(query, page),
		enabled: query !== "",
		placeholderData: keepPreviousData,
	});

	const handleInputQuery = async (value: string): Promise<void> => {
		setPage(1);
		setQuery(value);
	};
	const handleselectedMovie = (movie: Movie) => {
		setSelectedMovie(movie);
	};
	const handleCloseModal = () => {
		setSelectedMovie(null);
	};

	useEffect(() => {
		if (data && data.results.length === 0) {
			toast.error("No movies found for your request");
		}
	}, [data, isSuccess]);

	const totalPages = data?.total_pages ?? 0;

	return (
		<>
			<div className={css.app}>
				<SearchBar onSubmit={handleInputQuery} />
				{isSuccess && totalPages > 1 && (
					<ReactPaginate
						pageCount={totalPages}
						pageRangeDisplayed={5}
						marginPagesDisplayed={1}
						onPageChange={({ selected }) => setPage(selected + 1)}
						forcePage={page - 1}
						containerClassName={css.pagination}
						activeClassName={css.active}
						nextLabel="→"
						previousLabel="←"
					/>
				)}
				{!isError && data && data.results.length !== 0 && (
					<MovieGrid
						movies={data?.results}
						onSelect={handleselectedMovie}
					/>
				)}
				<Toaster position="top-center" reverseOrder={false} />
				{isLoading && <Loader />}
				{isError && <ErrorMessage />}

				{selectedMovie && (
					<MovieModal onClose={handleCloseModal} movie={selectedMovie} />
				)}
			</div>
		</>
	);
}

export default App;
