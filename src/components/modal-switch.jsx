// function ModalSwitch() {
// 	const location = useLocation();
// 	const history = useHistory();
// 	const background = location.state && location.state.background;
  
// 	const handleModalClose = () => {
// 	  dispatch({
// 		type: RESET_ITEM_TO_VIEW,
// 	  });
// 	  // Возвращаемся к предыдущему пути при закрытии модалки
// 	  history.goBack();
// 	};

// 	return (
// 		<>
// 		  <AppHeader />
// 		  <Switch location={background || location}>
// 			<Route path='/' exact>
// 			  <Main />
// 			</Route>
// 			<Route path='/ingredients/:ingredientId' exact>
// 			  <IngredientsDetails />
// 			</Route>
// 			<Route>
// 			  <NotFound404 />
// 			</Route>
// 		  </Switch>
	
	
// 		  {background && (
// 			<Route
// 			  path='/ingredients/:ingredientId'
// 			  children={
// 				<Modal onClose={handleModalClose}>
// 				  <IngredientsDetails />
// 				</Modal>
// 			  }
// 			/>
// 		  )}
// 		</>
// 	  );
// 	};
	

// function Card({ item }) {
// 	const location = useLocation();
  
// 	const ingredientId = item['_id'];
  
// 	return (
// 	  <Link
// 		key={ingredientId}
// 		to={{
// 		  // Тут мы формируем динамический путь для нашего ингредиента
// 		  // а также сохраняем в свойство background роут, на котором была открыта наша модалка
// 		  pathname: `/ingredients/${ingredientId}`,
// 		  state: { background: location },
// 		}}
// 		className={styles.link}
// 	  >
// 		... // реализация вашего компонента Card
// 	  </Link>
// 	);
//   }