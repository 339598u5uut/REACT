import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import stylePageModal from "./profile";
import { ingredients } from "../services/actions/ingredients";

const IngredientModalPage = () => {

    const dispatch = useDispatch();

      useEffect(() => {
        dispatch(ingredients()); 
    }, []);
   
    return (
        <main className={stylePageModal.main}>
            <div className={stylePageModal.container}>
                 <IngredientDetails/>
            </div>
        </main>
    )
}

export default IngredientModalPage;
