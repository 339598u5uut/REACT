import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import stylePageModal from "./profile";
import { ingredients } from "../services/actions/ingredients";

const IngredientModalPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { allIngredients } = useSelector(state => ({ allIngredients: state.ingredients.ingredients }));

    useEffect(() => {
        dispatch(ingredients());
    }, []);

    const view = useMemo(() => {
        let details = false;
        if (allIngredients) {
            allIngredients.forEach((i) => {
                if (i._id === id) {
                    details = true;
                }
            })
        }
        return details;
    }, [id, allIngredients]);

    return (
        <main className={stylePageModal.main}>
            <div className={stylePageModal.container}>
                {view && <IngredientDetails />}
            </div>
        </main>
    )
}

export default IngredientModalPage;
