describe('service is available', function() {
    beforeEach(() => {
        cy.viewport(1920, 1000);
        cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
        cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

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
        cy.get('[data-cy="item-ingredient"]').contains("Флюоресцентная булка R2-D3").trigger('dragstart');
        cy.get('[data-cy="constructor-form"]').trigger('drop');
        cy.get('[data-cy="item-ingredient"]').contains("Плоды Фалленианского дерева").trigger('dragstart');
        cy.get('[data-cy="constructor-form"]').trigger('drop');
        cy.get('[data-cy="item-ingredient"]').contains("Соус традиционный галактический").trigger('dragstart');
        cy.get('[data-cy="constructor-form"]').trigger('drop');
        cy.get('[data-cy="item-ingredient"]').contains("Филе Люминесцентного тетраодонтимформа").trigger('dragstart');
        cy.get('[data-cy="constructor-form"]').trigger('drop');
    });

    it('should be get order number,open and close order-modal', function() {
        cy.get('[data-cy="constructor-form"]').submit();
        cy.wait("@postOrder").then(() => { cy.get('[data-cy="order-details"]').contains("123") });
        cy.get('[data-cy="modal-close"]').click();
    });

    it('should be open and close ingredient-modal', function() {
        cy.get('[data-cy="item-ingredient"]').contains("Кристаллы марсианских альфа-сахаридов").click();
        cy.get('[data-cy="ingredient-details-modal"]').contains("Детали ингредиента");
        cy.get('[data-cy="modal-close"]').click();
    });

});