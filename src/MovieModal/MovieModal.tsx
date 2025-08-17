import { useEffect } from "react";
import type { Movie } from "../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
	selectedMovie: Movie;
	handleCloseModal: () => void;
}

const MovieModal = ({ selectedMovie, handleCloseModal }: MovieModalProps) => {
	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			handleCloseModal();
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				handleCloseModal();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [handleCloseModal]);

	return (
		<div
			onClick={handleBackgroundClick}
			className={css.backdrop}
			role="dialog"
			aria-modal="true">
			<div className={css.modal}>
				<button
					onClick={handleCloseModal}
					className={css.closeButton}
					aria-label="Close modal">
					&times;
				</button>
				<img
					src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
					alt={selectedMovie.title}
					className={css.image}
				/>
				<div className={css.content}>
					<h2>{selectedMovie.title}</h2>
					<p>{selectedMovie.overview}</p>
					<p>
						<strong>Release Date:</strong>
						{selectedMovie.release_date}
					</p>
					<p>
						<strong>Rating:</strong>
						{selectedMovie.vote_average}
					</p>
				</div>
			</div>
		</div>
	);
};

export default MovieModal;
