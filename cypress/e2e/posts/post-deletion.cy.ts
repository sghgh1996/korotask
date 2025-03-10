import TestIds from '../../types/testIds';
import { API_BASE_URL } from '../../../src/utils/constants';

describe('Post Deletion', () => {
  beforeEach(() => {
    cy.visit('/posts');
  });

  it('should successfully delete a post', () => {
    // Store initial post count and delete first post
    cy.get(`[data-testid=${TestIds.POSTS_ROW}]`).then(($rows) => {
      const initialCount = $rows.length;

      cy.get(`[data-testid=${TestIds.POST_DELETE_BUTTON}]`)
        .first()
        .click();

      cy.get(`[data-testid=${TestIds.POSTS_ROW}]`).should(
        'have.length',
        initialCount - 1
      );

      // Verify success toast
      cy.contains('Post deleted successfully').should('be.visible');
    });
  });

  it('should show error message when deletion fails', () => {
    cy.intercept('DELETE', `${API_BASE_URL}/posts/*`, {
      statusCode: 500, // Mock error response
      body: { message: 'Server error' }
    }).as('deletePostError');

    cy.get(`[data-testid=${TestIds.POSTS_ROW}]`).then(($rows) => {
      const initialCount = $rows.length;

      cy.get(`[data-testid=${TestIds.POST_DELETE_BUTTON}]`)
        .first()
        .click();

      cy.get(`[data-testid=${TestIds.POSTS_ROW}]`).should(
        'have.length',
        initialCount
      );

      cy.contains('Error deleting post').should('be.visible');
    });
  });

  it('should show loading state while deleting', () => {
    const deleteButton = cy.get(`[data-testid=${TestIds.POST_DELETE_BUTTON}]`).first();

    deleteButton.click();

    deleteButton.should('be.disabled');

    cy.contains('Post deleted successfully').should('be.visible');
  });
});