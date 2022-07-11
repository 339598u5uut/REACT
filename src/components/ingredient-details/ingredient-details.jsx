import React from 'react';
import styledetails from './ingredient-details-style.module.css';
import { useSelector } from 'react-redux';

export function IngredientDetails() {
	const ingredientDetales = useSelector(state => state.currentIngredient.ingredient);

	return (
		<div className={styledetails.container}>
			<p className={`${'text text_type_main-large mb-10'} ${'header_align'}`}>Детали ингредиента</p>
			<img src={ingredientDetales.image} alt={ingredientDetales.name}></img>
			<p className={'text text_type_main-medium mb-5'}>{ingredientDetales.name}</p>
			<div className={styledetails.container_detales}>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Калории, ккал</p>
					<p className={'text text_type_main-small text_color_inactive'}>{ingredientDetales.calories}</p>
				</div>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Белки, г</p>
					<p className={'text text_type_main-small text_color_inactive'}>{ingredientDetales.proteins}</p>
				</div>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Жиры, г</p>
					<p className={'text text_type_main-small text_color_inactive'}>{ingredientDetales.fat}</p>
				</div>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Углеводы, г</p>
					<p className={'text text_type_main-small text_color_inactive'}>{ingredientDetales.carbohydrates}</p>
				</div>
			</div>
		</div>
	)
}

export default IngredientDetails;