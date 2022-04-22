describe('My First Test', () => {
  it('Visits the todo top page', () => {
    cy.visit('/')
    cy.get("[data-cy='header_title']").contains('Todoアプリ');
    cy.task('log', "*** start log ***")
    cy.get("[data-cy='card']").each(($el, index, $list) => {
//       cy.task('log', $el)
//       cy.task('log', index)
       cy.task('log', $list[index])
    })
    cy.task('log', "*** end log ***")
  });

//   it('Visits the category top page', () => {
//     cy.visit('/category')
//     cy.contains('カテゴリー一覧')
//   });
})
