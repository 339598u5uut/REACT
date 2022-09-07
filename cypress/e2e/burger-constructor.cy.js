describe('service is available', function() {
    beforeEach(() => {
        cy.viewport(1920, 1000);
        cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
        cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

        // Устанавливаем токены:
        window.localStorage.setItem(
            "refreshToken",
            JSON.stringify("test-refreshToken")
        );
        cy.setCookie('accessToken', 'test-accessToken')
    });

    afterEach(function() {
        cy.clearLocalStorage();
        cy.clearCookies();
    });

    it('should be available on localhost:3000', function() {
        cy.visit('http://localhost:3000');
    });

    it('should be drag-and-drop', function() {
        cy.get('.burger-ingredients-style_item__MNF0i').contains("Флюоресцентная булка R2-D3").trigger('dragstart');
        cy.get('.burger-constructor-style_order__Y9iVo').trigger('drop');
        cy.get('.burger-ingredients-style_item__MNF0i').contains("Плоды Фалленианского дерева").trigger('dragstart');
        cy.get('.burger-constructor-style_order__Y9iVo').trigger('drop');
        cy.get('.burger-ingredients-style_item__MNF0i').contains("Соус традиционный галактический").trigger('dragstart');
        cy.get('.burger-constructor-style_order__Y9iVo').trigger('drop');
        cy.get('.burger-ingredients-style_item__MNF0i').contains("Филе Люминесцентного тетраодонтимформа").trigger('dragstart');
        cy.get('.burger-constructor-style_order__Y9iVo').trigger('drop');
    });

    it('should be get order number,open and close order-modal', function() {
        cy.get('.burger-constructor-style_button__EaheV').contains("Оформить заказ").click();
        cy.get('.order-details-style_container__BTtGO').contains("123");
        cy.get('.modal-style_icon__gvLyg').click();
    });

    it('should be open and close ingredient-modal', function() {
        cy.get('.burger-ingredients-style_item__MNF0i').contains("Кристаллы марсианских альфа-сахаридов").click();
        cy.get('.ingredient-details-style_container__d147s').contains("Детали ингредиента");
        cy.get('.modal-style_icon__gvLyg').click();
    });

});