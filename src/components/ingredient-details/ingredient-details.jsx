import React from 'react';
import styledetails from './ingredient-details-style.module.css';
import { PropTypes } from 'react';


function IngredientDetails(props) {
	return (
		<div className={styledetails.container}>
			<p className={'text text_type_digits-medium mb-10'}>Детали ингредиента</p>
			<img src={props.image} alt={props.name}></img>
			<p className={'text text_type_digits-defoult mb-5'}>{props.name}</p>
			<div className={styledetails.container_detales}>
				<div>
					<p className={'text text_type_digits-small text_color_inactive mb-2'}>Калории, ккал</p>
					<p>{props.calories}</p>
				</div>
				<div>
					<p className={'text text_type_digits-small text_color_inactive mb-2'}>Белки, г</p>
					<p>{props.proteins}</p>
				</div>
				<div>
					<p className={'text text_type_digits-small text_color_inactive mb-2'}>Жиры, г</p>
					<p>{props.fat}</p>
				</div>
				<div>
					<p className={'text text_type_digits-small text_color_inactive mb-2'}>Углеводы, г</p>
					<p>{props.carbohydrates}</p>
				</div>
			</div>
		</div>
	)
}

// IngredientDetails.propTypes = {
// 	carbohydrates:PropTypes.string,
// 	fat:PropTypes.string,
// 	calories:PropTypes.string,
// 	proteins:PropTypes.string,
// 	name:PropTypes.string,
// 	className: PropTypes.string,
// }

export default IngredientDetails;