class dramatyczny {
    _scrollSelector = ':nth-child(4) > .l-inner > :nth-child(1) > .c-heading__action > .c-link > .c-label';
    _scrollFooterSelector = '.c-footer-bottom';

    getScrSel(){
        return cy.get(this._scrollSelector);
    }

    getScrFooterSel(){
        return cy.get(this._scrollFooterSelector);
    }

} export default dramatyczny