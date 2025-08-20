import axios from "axios";
import { type Movie } from "../types/movie";

interface SearchResponse {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

const movieService = async (
	query: string,
	page: number
): Promise<SearchResponse> => {
	const baseURL = "https://api.themoviedb.org/3/search/movie";
	const token = import.meta.env.VITE_TMDB_TOKEN;
	const config = {
		params: { query: query, page: page },
		headers: { Authorization: `Bearer ${token}` },
	};

	const { data } = await axios.get<SearchResponse>(baseURL, config);

	console.log(data);

	return data;
};

export default movieService;
