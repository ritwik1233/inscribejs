describe('Basic Editor Testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000')
  });
  it('Add two lines to empty editor', () => {
    cy.get('[data-order="lineItem-0"]').should('exist').type('This is the first line')
      .should('have.text', 'This is the first line').blur();
    cy.get('[data-order="lineItem-1"]').should('exist')
      .type("This is the second line")
      .blur()
      .should('have.text', 'This is the second line');
  })
  it('Add two lines to empty editor, press enter in second line to generate third line', () => {
    cy.get('[data-order="lineItem-0"]').should('exist').type('This is the first line')
      .should('have.text', 'This is the first line').blur();
    cy.get('[data-order="lineItem-1"]').should('exist')
      .type("This is the second line{enter}")
      .should('have.text', 'This is the second line');
    cy.get('[data-order="lineItem-2"]').should('exist').should('have.text', '');
  })
  it('Add third line between two lines', () => {
    cy.get('[data-order="lineItem-0"]').should('exist').type('This is the first line')
      .should('have.text', 'This is the first line').blur();
    cy.get('[data-order="lineItem-1"]').should('exist')
      .type("This is the second line")
      .should('have.text', 'This is the second line');
    cy.get('[data-order="lineItem-0"]').type('{enter}');
    cy.get('[data-order="lineItem-1"]').should('exist')
      .should('have.text', '').type('This is the third line')
      .should('have.text', 'This is the third line').blur();
    cy.get('[data-order="lineItem-2"]').should('exist').should('have.text', 'This is the second line');
  })
  it('Add third line between two lines, remove middle line', () => {
    cy.get('[data-order="lineItem-0"]').should('exist').type('This is the first line')
      .should('have.text', 'This is the first line').blur();
    cy.get('[data-order="lineItem-1"]').should('exist')
      .type("This is the second line")
      .should('have.text', 'This is the second line');
    cy.get('[data-order="lineItem-0"]').type('{enter}');
    cy.get('[data-order="lineItem-1"]').should('exist')
      .should('have.text', '').type('This is the third line')
      .should('have.text', 'This is the third line').blur();
    cy.get('[data-order="lineItem-2"]').should('exist')
    .should('have.text', 'This is the second line');
    let backspaces = Array(24).join('{backspace}');
    cy.get('[data-order="lineItem-1"]').type(backspaces);
    cy.get('[data-order="lineItem-2"]').should('not.exist');
  })
})