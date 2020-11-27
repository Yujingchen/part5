describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Bird',
            username: 'angrybird',
            password: 'shoot'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('blogs')
        cy.contains('Blog app, Department of Computer Science, University of Helsinki 2020')
    })

    it('login form can be opened', function () {
        cy.contains('login').click()
    })

    it('user can login', function () {
        cy.contains('login').click()
        cy.get('#username').type('angrybird')
        cy.get('#password').type('shoot')
        cy.get('#login-button').click()

        cy.contains('tiny logged in')
    })

    it.only('login fails with wrong passwprd', function () {
        cy.contains('login').click()
        cy.get('#username').type('angrybird')
        cy.get('#password').type('pigs')
        cy.get('#login-button').click()

        cy.contains('Wrong credentials')

        cy.get('.error').should('Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
        cy.get('html').should('not.contain', 'angrybird logged in')
    })
    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'angrybird', password: 'shoot' })
            // cy.request('POST', 'http://localhost:3003/api/login', {
            //     username: 'angrybird', password: 'shoot'
            // }).then(response => {
            //     localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
            //     cy.visit('http://localhost:3000')
            // })
            // cy.contains('login').click()
            // cy.get('#username').type('angrybird')
            // cy.get('#password').type('shoot')
            // cy.get('#login-button').click()
        })
        it('a new blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('a blog created by cypress')
            cy.get('#author').type('cypress')
            cy.get('#url').type('cypress.com')
            cy.get('#create-button').click()
            cy.contains('a log created by cypress')
        })
        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'another blog created by cypress',
                    author: 'cypress',
                    url: 'cypress.com'
                })
                // cy.contains('new blog').click()
                // cy.get('#title').type('another blog created by cypress')
                // cy.get('#author').type('cypress')
                // cy.get('#url').type('cypress.com')
                // cy.get('#create-button').click()
            })
            it('it can increase like', function () {
                cy.contains('another blog created by cypress')
                    .contains('like')
                    .click()

                cy.contains('another blog created by cypress')
                    .contains("likes 1")
            })

        })
        describe('and several blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'first blog', author: 'cypress', url: 'cypress.com' })
                cy.createBlog({ title: 'second blog', author: 'cypress', url: 'cypress.com' })
                cy.createBlog({ title: 'third blog', author: 'cypress', url: 'cypress.com' })
            })

            it('one of those can be add a like', function () {
                cy.contains('second blog')
                    .parent().find('button').as('theShowButton')

                cy.get('@theShowButton').click()

                // cy.get('@theShowButton').should('contain', 'make not important')
                cy.contains('second blog')
                    .contains("like")
                    .click()

                cy.contains('second blog')
                    .contains("likes 1")
            })
        })
    })


})

// describe('Note app', function () {
//     it('front page can be opened', function () {
//         cy.visit('http://localhost:3000')
//         cy.contains('Notes')
//         cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
//     })
// })

// describe('My first test', function () {
//     it('dose not do much', function () {
//         expect(true).to.equal(true)
//     })
// })