import {func} from "prop-types"

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/users/reset')
    const user = {
      name: 'rootbotk',
      username: 'rootbotk',
      password: 'rootbotk'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })
  describe('Login', function (){
  it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('rootbotk')
      cy.get('#password').type('rootbotk')
      cy.get('#login-button').click()

      cy.contains('rootbotk logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('rootbotk')
      cy.get('#password').type('forgetpassword')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')

      cy.get('.error').should('contain','Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'rootbotk logged in')
    })
  })


  describe('when logged in', function () {
    beforeEach(function () {
      cy.request({method:'POST', url: 'http://localhost:3003/api/blogs/reset'})
      cy.login({ username: 'rootbotk', password: 'rootbotk' })
      // const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      // console.log('loggedUserJSON',loggedUserJSON);
      // const token = JSON.parse(loggedUserJSON)
    })
    it('front page can be opened', function () {
      cy.contains('blogs')
      cy.contains('Blog app, Department of Computer Science, University of Helsinki 2020')
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')
    })
    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog created by cypress',
          author: 'cypress',
          url: 'cypress.com'
        })
      })
      it('user can increase like', function () {
        cy.contains('another blog created by cypress')
          .parent().find('.showButton').as('theShowButton')
        cy.get('@theShowButton').click()

        cy.contains('another blog created by cypress')
          .parent().find('.blogContent').find('.likeButton').
          as('thelikeButton')
        cy.get('@thelikeButton').click()

        cy.contains('another blog created by cypress').parent().find('.likesCount')
          .contains('1')
      })

      it('user can delete a blog', function () {
        cy.contains('another blog created by cypress')
          .parent().find('.deleteButton').as('theDeleteButton')
        cy.get('@theDeleteButton').click()
        cy.get('html').should('not.contain', 'another blog created by cypress')
      })
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'cypress', url: 'cypress.com', likes:2 })
        cy.createBlog({ title: 'second blog', author: 'cypress', url: 'cypress.com', likes:1 })
        cy.createBlog({ title: 'third blog', author: 'cypress', url: 'cypress.com', likes:3 })
      })

      it('one of those can be add a like', function () {
        cy.contains('second blog')
          .parent().find('.showButton').as('theShowButton')
        cy.get('@theShowButton').click()

        cy.contains('second blog')
          .parent().find('.blogContent').find('.likeButton').
          as('thelikeButton')
        cy.get('@thelikeButton').click()

        cy.contains('second blog').parent().find('.likesCount')
          .contains('2')
      })

      it('blogs are listed according to number of like', function () {

        cy.contains('blogs').parent().find('.blog').find('.showButton').click({ multiple: true })

        cy
          .get('.likesCount')
          .spread((firstBlogLikesCount, secondBlogLikesCount, thirdBlogLikesCount) => {
            cy.wrap(firstBlogLikesCount).should('have.text','3 ')
            cy.wrap(secondBlogLikesCount).should('have.text','2 ')
            cy.wrap(thirdBlogLikesCount).should('have.text','1 ')
          })
      })

    })
  })




})
