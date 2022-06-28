import PropTypes from 'prop-types';

const ingredientType =
    PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        open: PropTypes.bool,
        isLocked: PropTypes.bool,
        key: PropTypes.number,
        type: PropTypes.string,
        size: PropTypes.string,
        price: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired

export default ingredientType;