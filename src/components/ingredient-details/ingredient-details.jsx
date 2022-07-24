import React from 'react';
import styledetails from './ingredient-details-style.module.css';
import { useSelector } from 'react-redux';
import {useParams} from "react-router-dom";
import { useMemo } from 'react';
export function IngredientDetails() {

	
	const ingredientDetales = useSelector(state => state.currentIngredient.ingredient);
	const ingredients = useSelector(state => state.ingredients.ingredients);
    const {id} = useParams();

    const selected = useMemo(() => {
        return ingredients.find((i) => i._id === id);
    }, [id, ingredients]);
   

	return (
		<div className={styledetails.container}>
			<p className={`${'text text_type_main-large mb-10'} ${'header_align'}`}>Детали ингредиента</p>
			<img src={selected.image} alt={selected.name}></img>
			<p className={'text text_type_main-medium mb-5'}>{ingredientDetales.name}</p>
			<div className={styledetails.container_detales}>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Калории, ккал</p>
					<p className={'text text_type_main-small text_color_inactive'}>{selected.calories}</p>
				</div>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Белки, г</p>
					<p className={'text text_type_main-small text_color_inactive'}>{selected.proteins}</p>
				</div>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Жиры, г</p>
					<p className={'text text_type_main-small text_color_inactive'}>{selected.fat}</p>
				</div>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Углеводы, г</p>
					<p className={'text text_type_main-small text_color_inactive'}>{selected.carbohydrates}</p>
				</div>
			</div>
		</div>
	)
}

export default IngredientDetails;