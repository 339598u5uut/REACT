import styledetails from './ingredient-details-style.module.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ingredients } from '../../services/actions/ingredients';


export function IngredientDetails() {

	const [ingredient, setIngredient] = useState({})	
	const allIngredients = useSelector(state => state.ingredients.ingredients);
	const { id } = useParams();
	
	useEffect(() => {		
		if (!id || allIngredients?.lenght < 1) return;
		const findIngredient = allIngredients.find(i => i._id === id);
		findIngredient && setIngredient(findIngredient)
	}, [id, allIngredients]);

	return (
		<div className={styledetails.container}>
			<p className={`${'text text_type_main-large mb-10'} ${'header_align'}`}>Детали ингредиента</p>
			<img src={ingredient.image} alt={ingredient.name}></img>
			<p className={'text text_type_main-medium mb-5'}>{ingredient.name}</p>
			<div className={styledetails.container_detales}>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Калории, ккал</p>
					<p className={'text text_type_main-small text_color_inactive'}>{ingredient.calories}</p>
				</div>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Белки, г</p>
					<p className={'text text_type_main-small text_color_inactive'}>{ingredient.proteins}</p>
				</div>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Жиры, г</p>
					<p className={'text text_type_main-small text_color_inactive'}>{ingredient.fat}</p>
				</div>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Углеводы, г</p>
					<p className={'text text_type_main-small text_color_inactive'}>{ingredient.carbohydrates}</p>
				</div>
			</div>
		</div>
	)
}

export default IngredientDetails;