import styleNotFound from './not-found-style.module.css';

const NotFoundPage = () => {
	return (
		<main>
			<div className={styleNotFound.container}>
				<h1 className={styleNotFound.header}>404 NOT FOUND</h1>
			</div>
		</main>
	)
}

export default NotFoundPage;
