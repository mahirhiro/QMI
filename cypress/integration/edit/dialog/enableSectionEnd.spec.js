describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a specific question', () => {
        const questionTypes = ['checkbox', 'date', 'drawing', 'dropdown', 'likert', 'number', 'radio', 'range',
            'textarea', 'textfield'];
        for (let i = 0; i < questionTypes.length; i++) {
            cy.enableSectionEnd(questionTypes[i]);
        }
    });
});


