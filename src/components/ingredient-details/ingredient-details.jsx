import React from 'react';
import styledetails from './ingredient-details-style.module.css';
import PropTypes from "prop-types";

function IngredientDetails(props) {
	return (
		<div className={styledetails.container}>
			<p className={`${'text text_type_main-large mb-10'} ${'header_align'}`}>Детали ингредиента</p>
			<img src={props.image} alt={props.name}></img>
			<p className={'text text_type_main-medium mb-5'}>{props.name}</p>
			<div className={styledetails.container_detales}>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Калории, ккал</p>
					<p className={'text text_type_main-small text_color_inactive'}>{props.calories}</p>
				</div>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Белки, г</p>
					<p className={'text text_type_main-small text_color_inactive'}>{props.proteins}</p>
				</div>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Жиры, г</p>
					<p className={'text text_type_main-small text_color_inactive'}>{props.fat}</p>
				</div>
				<div>
					<p className={'text text_type_main-small text_color_inactive mb-2'}>Углеводы, г</p>
					<p className={'text text_type_main-small text_color_inactive'}>{props.carbohydrates}</p>
				</div>
			</div>
		</div>
	)
}

IngredientDetails.propTypes = {
	calories: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	proteins: PropTypes.number.isRequired,
}

export default IngredientDetails;