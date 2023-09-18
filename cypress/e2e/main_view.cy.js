describe('displaying default elements', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  context('testing text', ()=>{
    it('has header text', () => {
      cy.get('.css-1jijfcn').should('have.text', 'Welcome to the pre-configured next template. Created by KaiserKoenig GmbH');
    })
    it('has subtitles',  ()=>{
      return cy.get('.css-15ihgqe').invoke('text').then((text) => {
        chai.expect(text).to.match(/This data came from the english common\.json file|Diese Information kam von der deutschen common\.json file/);
      }).then(result => result);
    })
  })
})
