import IngredientDetails from "../components/ingredient-details/ingredient-details";
import stylePageModal from "./page-modal-ingredient-style.module.css";

const IngredientModalPage = () => {
    return (
        <main className={stylePageModal.main}>
            <div className={stylePageModal.container}>
                <IngredientDetails />
            </div>
        </main>
    )
}

export default IngredientModalPage;
