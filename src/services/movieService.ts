import axios from "axios";
import { type Movie } from "../types/movie";

interface SearchResponse {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

const movieService = async (query: string): Promise<SearchResponse> => {
	const baseURL = "https://api.themoviedb.org/3/search/movie";
	const token = import.meta.env.VITE_TMDB_TOKEN;
	const config = {
		params: { query: query },
		headers: { Authorization: `Bearer ${token}` },
	};

	const response = await axios.get<SearchResponse>(baseURL, config);
	return response.data;
};

export default movieService;
