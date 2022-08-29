import { useDispatch } from "../services/reducers/root-reducer";
import { useEffect } from "react";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import stylePageModal from "./page-modal-ingredient-style.module.css";
import { ingredients } from "../services/actions/ingredients";

const IngredientModalPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ingredients());
    }, [dispatch]);

    return (
        <main className={stylePageModal.main}>
            <div className={stylePageModal.container}>
                <IngredientDetails />
            </div>
        </main>
    )
}

export default IngredientModalPage;
