describe('Basic Editor Testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000')
  });
  // it('Add two lines to empty editor', () => {
  //   cy.get('[data-order="lineItem-0"]').should('exist').type('This is the first line')
  //     .should('have.text', 'This is the first line').blur();
  //   cy.get('[data-order="lineItem-1"]').should('exist')
  //     .type("This is the second line")
  //     .blur()
  //     .should('have.text', 'This is the second line');
  // })
  // it('Add two lines to empty editor, press enter in second line to generate third line', () => {
  //   cy.get('[data-order="lineItem-0"]').should('exist').type('This is the first line')
  //     .should('have.text', 'This is the first line').blur();
  //   cy.get('[data-order="lineItem-1"]').should('exist')
  //     .type("This is the second line{enter}")
  //     .should('have.text', 'This is the second line');
  //   cy.get('[data-order="lineItem-2"]').should('exist').should('have.text', '');
  // })
  // it('Add third line between two lines', () => {
  //   cy.get('[data-order="lineItem-0"]').should('exist').type('This is the first line')
  //     .should('have.text', 'This is the first line').blur();
  //   cy.get('[data-order="lineItem-1"]').should('exist')
  //     .type("This is the second line")
  //     .should('have.text', 'This is the second line');
  //   cy.get('[data-order="lineItem-0"]').type('{enter}');
  //   cy.get('[data-order="lineItem-1"]').should('exist')
  //     .should('have.text', '').type('This is the third line')
  //     .should('have.text', 'This is the third line').blur();
  //   cy.get('[data-order="lineItem-2"]').should('exist').should('have.text', 'This is the second line');
  // })
  it('Add third line between two lines', () => {
    cy.get('[data-order="lineItem-0"]').should('exist')
      .type('This is the first line')
      .blur()
    cy.wait(4000);
    cy.get('[data-order="lineItem-0"]').focus();
    cy.wait(4000);

    cy.get('[data-order="lineItem-0"]').children(children => {
      cy.log(children)
      cy.window().then((window) => {
        // const selection = window.getSelection();
        // const range = window.document.createRange();
        // range.setStart(startNode, 0);
        // range.setEnd(endNode, 1);
        // selection?.removeAllRanges();
        // selection?.addRange(range);
        // selection?.extend(startNode, 1);
      });
    });
    // cy.get('[data-order="lineItem-0"]')
    //   .focus()
    //   .trigger('mousedown')
    //   .trigger('mousemove', { clientX: 120, clientY: 30.5 })
    //   .trigger('mouseup');

  })
})