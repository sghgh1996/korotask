import TestIds from '../../types/testIds';
import { API_BASE_URL } from '../../../src/utils/constants';

describe('Post Form', () => {
  describe('Create New Post', () => {
    beforeEach(() => {
      cy.visit('/posts/new');
      cy.wait(1000);
    });

    it('should create a new post successfully', () => {
      cy.get(`[data-testid=${TestIds.POST_FORM_TITLE}]`).type(
        'My Test Post Title'
      );

      cy.get(`[data-testid=${TestIds.POST_FORM_AUTHOR}] select`).select(1);

      cy.get(`[data-testid=${TestIds.POST_FORM_BODY}]`).type(
        'This is a test post body with more than thirty characters to pass validation.'
      );

      cy.get(`[data-testid=${TestIds.POST_FORM_SUBMIT}]`).click();

      cy.contains('Post created successfully!').should('be.visible');
      cy.url().should('include', '/posts');
    });

    it('should show validation errors for empty fields', () => {
      cy.get(`[data-testid=${TestIds.POST_FORM_SUBMIT}]`).click();

      cy.contains('Title is required').should('be.visible');
      cy.contains('Body is required').should('be.visible');
      cy.contains('Please select an author').should('be.visible');
    });

    it('should show validation errors for invalid inputs', () => {
      cy.get(`[data-testid=${TestIds.POST_FORM_TITLE}]`)
        .type('ab')
        .invoke('blur');
      cy.contains('Title must be at least 3 characters').should('be.visible');

      cy.get(`[data-testid=${TestIds.POST_FORM_BODY}]`)
        .type('Too short')
        .invoke('blur');

      cy.contains('Body must be at least 30 characters').should('be.visible');
    });

    it('should handle API error during creation', () => {
      cy.intercept('POST', `${API_BASE_URL}/posts`, {
        statusCode: 500,
        body: { message: 'Server error' }
      }).as('createPostError');

      cy.get(`[data-testid=${TestIds.POST_FORM_TITLE}]`).type('Test Post');
      cy.get(`[data-testid=${TestIds.POST_FORM_AUTHOR}] select`).select(1);

      cy.get(`[data-testid=${TestIds.POST_FORM_BODY}]`).type(
        'This is a test post body with more than thirty characters to pass validation.'
      );

      cy.get(`[data-testid=${TestIds.POST_FORM_SUBMIT}]`).click();

      cy.contains('Error creating post').should('be.visible');
    });
  });

  describe('Edit Post', () => {
    beforeEach(() => {
      cy.visit('/posts');
      cy.wait(1000);
      cy.get(`[data-testid=${TestIds.POST_EDIT_BUTTON}]`).first().click();
      
      cy.wait(1000);
    });

    it('should edit post successfully', () => {
      const updatedTitle = 'Update';
      const updatedBody = 'Update';

      cy.get(`[data-testid=${TestIds.POST_FORM_TITLE}]`)
        .type(updatedTitle);

      cy.get(`[data-testid=${TestIds.POST_FORM_BODY}]`)
        .type(updatedBody);

      cy.get(`[data-testid=${TestIds.POST_FORM_SUBMIT}]`).click();

      cy.contains('Post updated successfully!').should('be.visible');
    });

    it('should handle API error during update', () => {
      cy.intercept('PUT', `${API_BASE_URL}/posts/*`, {
        statusCode: 500,
        body: { message: 'Server error' }
      }).as('updatePostError');

      cy.get(`[data-testid=${TestIds.POST_FORM_TITLE}]`)
        .type('Update');

      cy.get(`[data-testid=${TestIds.POST_FORM_SUBMIT}]`).click();

      cy.contains('Error updating post').should('be.visible');
    });
  });
});
