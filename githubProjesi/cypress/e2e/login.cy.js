describe('Login Form Test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });

    it('a) Başarılı form doldurulduğunda submit edebiliyorum', ()=> {
        cy.get('input[name="email"').type("test@example.com");
        cy.get('input[name="password"]').type('Aa123456@');
        cy.get('input[name="term"]').check();

        cy.get('.invalid-feedback').should('not.exist');
        cy.get('button').should('not.be.disabled');
        cy.get('button').click();

        cy.url().should('include', '/success');
        cy.contains('Success').should('exist');
    });

    it('b) Hatalı durumlarda hata mesajları görünmeli ve buton disabled kalmalı', () => {
    
    // 1️⃣ Email yanlış
    cy.get('input[name="email"]').type('osmanCan')
    cy.get('input[name="password"]').type('Aa123456@')
    cy.get('input[name="term"]').check()

    // 1 hata mesajı
    cy.get('.invalid-feedback').should('have.length', 1)
    cy.contains('Mail adresini kontrol ediniz.').should('exist')

    // Buton disabled
    cy.get('button').should('be.disabled')

    // Temizle
    cy.get('input[name="email"]').clear()
    cy.get('input[name="password"]').clear()

    // 2️⃣ Email ve password yanlış
    cy.get('input[name="email"]').type('yanlisemail')
    cy.get('input[name="password"]').type('123456')
    cy.get('input[name="term"]').check()

    // 2 hata mesajı
    cy.get('.invalid-feedback').should('have.length', 2)
    cy.contains('Parola min 8, Büyük Harf, Küçük Harf, Sayı, Özel Karakter').should('exist')

    // Buton disabled
    cy.get('button').should('be.disabled')

    // 3️⃣ Email ve password doğru ama checkbox işaretlenmedi
    cy.get('input[name="email"]').clear().type('test@example.com')
    cy.get('input[name="password"]').clear().type('Aa123456@')
    cy.get('input[name="term"]').uncheck()

    // Buton hala disabled
    cy.get('button').should('be.disabled');
    cy.get('.invalid-feedback').should('have.length', 1)
  })
})