/// <reference types="cypress" />
import dramatyczny from '../../PageObject/dramatycznyPageObject'
const drama = new dramatyczny()

beforeEach('Setup', () => {
    cy.visit('https://dramatyczny.pl/')
    cy.fixture('frazy').then((frazy) => {
    cy.url().should('contain', frazy[3].query)
    })
})

describe('Test of Cookie pop-up', () => {
    it('1 confirm pop-up', () => {
        cy.get('.c-cookies__close').should('be.visible')
        cy.get('.c-cookies__close').click()
        cy.get('.c-cookies__close').should('not.be.visible')
    })
})

describe('Test of contrast changing', () => { 
    it('2 contrast change', () => {
        cy.get(':nth-child(1) > .c-contrast > .c-contrast__switch').should('be.visible')
        cy.get(':nth-child(1) > .c-contrast > .c-contrast__switch').click()
        cy.get('#menu > .l-inner').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    })
})

describe('Test of font resizing', () => { 
    it('3 font resizing', () => {
        cy.get('[data-size="24"]').should('be.visible')
            .click()
        cy.get('body')
            .should('have.css', 'font-size', '24px')
        cy.get('[data-size="32"]').should('be.visible')
            .click()
        cy.get('body')
            .should('have.css', 'font-size', '32px')
    })
})

describe('Newsletter subscription tests', () => {
    it('4 newsletter subscription test without specifying an e-mail address', () => {
        cy.get('.f-field--checkbox > .f-field__label')
            .should('be.visible')
            .should('have.css', 'color', 'rgb(168, 168, 168)')
        cy.get('.f-field__action > .c-btn > .c-label').should('be.visible')
            .click()
        cy.get('.parsley-custom-error-message').should('be.visible')
            .should('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('.f-field--checkbox > .f-field__label')
            .should('be.visible')
            .should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it('5 newsletter subscription test with invalid e-mail address', () => {
        cy.get('.f-field__action > .f-field__control').should('be.visible').clear().type('asdasd')
        cy.get('.f-field__mark')
            .click()
        cy.get('.f-field__action > .c-btn > .c-label')
            .should('be.visible')
            .click()
            .wait(1000)
        cy.get('.parsley-custom-error-message').should('be.visible')
            .should('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('.f-field--checkbox > .f-field__label')
            .should('be.visible')
            .should('have.css', 'color', 'rgb(255, 255, 255)')
    })

    it('6 newsletter subscription with correct e-mail adress', () => {
        cy.get('.f-field__action > .f-field__control').should('be.visible').clear().type('test@test.pl')
        cy.get('.f-field__mark')
            .click()
        cy.get('.f-field__action > .c-btn > .c-label')
            .should('be.visible')
            .click()
            .wait(1000)
        cy.fixture('frazy').then((frazy) => {
            cy.get('.f-field__success').should('contain', frazy[4].query)
        })
    })
})

describe('Test of the home page returning ', () => {
    it('7 return to home page', () => {
        cy.get(':nth-child(1) > .c-project-box').should('be.visible').click()
        cy.fixture('frazy').then((frazy) => {
            cy.url().should('contain', frazy[5].query)
        })
        cy.get('.c-footer-nav__logo > .o-logo').should('be.visible').click()
        cy.fixture('frazy').then((frazy) => {
            cy.url().should('contain', frazy[3].query)
        })
    })
})

describe('Test of information visibility', () => {
    it('8 information about the project', () => {
        cy.get(':nth-child(5) > .c-main-nav__link > .c-label').click();
        cy.url().should('equal', 'https://dramatyczny.pl/projekty/?active=1');
        cy.contains("h3", "Bajkowe Poranki").click();
        cy.url().should('equal', 'https://dramatyczny.pl/projekty/bajkowe-poranki/');
        cy.get('p').contains('Wstęp wolny!')
            .should('be.visible')
    })
    it('9 visability of contact informations', () => {
        cy.contains("span", "Kontakt").trigger('mouseover').click();
        cy.url().should('contain', 'kontakt');
        cy.get('li').contains('ul. Elektryczna 12')
            .should('be.visible')
    })

    it('10 location informations', () => {
        cy.get(':nth-child(4) > .c-main-nav__link > .c-label').click();
        cy.url().should('equal', 'https://dramatyczny.pl/aktualnosci/');
        cy.get('.c-ad-box').should('be.visible')
    })
})

describe('11 Test of project partners logos visibility',()=>{
    it('project partners logo', () => {
        cy.get(':nth-child(5) > .c-main-nav__link > .c-label').click();
        cy.url().should('equal','https://dramatyczny.pl/projekty/?active=1');
        cy.contains("h3","Bajkowe Poranki").click();
        cy.url().should('equal','https://dramatyczny.pl/projekty/bajkowe-poranki/');
        cy.get(':nth-child(6) > a > picture').should('be.visible');
        cy.get(':nth-child(9) > a > picture').should('be.visible');
        cy.get(':nth-child(12) > a > picture').should('be.visible')   
     })
}) 

describe('Scrolling page',()=>{
    it('12 scrolling page to find elements',()=>{
        cy.get('.c-header__nav > :nth-child(1)').should('be.visible');
        drama.getScrSel().scrollIntoView({duration:2500});
        drama.getScrSel().should('be.visible');
        cy.get('.c-header__nav > :nth-child(1)').should('be.visible')
        drama.getScrFooterSel().scrollIntoView({duration:2500});
        cy.get('.c-footer-nav__main > .c-social-list').should('be.visible');
        cy.get('.c-header__nav > :nth-child(1)').should('be.visible');
        
    })
})



