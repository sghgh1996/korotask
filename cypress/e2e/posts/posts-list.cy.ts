import TestIds from '../../types/testIds';
import { API_BASE_URL } from '../../../src/utils/constants';

describe('Posts List Page', () => {
  beforeEach(() => {
    cy.visit('/posts');
  });

  it('should display the posts list page', () => {
    cy.get(`[data-testid=${TestIds.POSTS_CONTAINER}]`).should('exist');
    cy.get(`[data-testid=${TestIds.POSTS_ROW}]`).should(
      'have.length.at.least',
      1
    );
  });

  it('should display post details correctly', () => {
    cy.get(`[data-testid=${TestIds.POSTS_ROW}]`)
      .first()
      .within(() => {
        cy.get(`[data-testid=${TestIds.POSTS_ROW_TITLE}]`).should('exist');
        cy.get(`[data-testid=${TestIds.POSTS_ROW_BODY}]`).should('exist');
        cy.get(`[data-testid=${TestIds.POSTS_ROW_AUTHOR}]`).should('exist');
      });
  });

  it('should display loading state while fetching posts', () => {
    cy.fixture('data.json').then((mockResultItems) => {
      cy.intercept('GET', `${API_BASE_URL}/posts`, {
        statusCode: 200,
        delay: 2000, // to capture loading
        body: mockResultItems
      }).as('getPosts');
    });

    cy.visit('/posts');
    cy.get(`[data-testid=${TestIds.POSTS_LOADING}]`).should('be.visible');
    cy.wait('@getPosts');
    cy.get(`[data-testid=${TestIds.POSTS_LOADING}]`).should('not.exist');
  });

  it('should display error message when posts fetch fails', () => {
    cy.intercept('GET', `${API_BASE_URL}/posts`, {
      statusCode: 500
    }).as('getPostsError');

    cy.visit('/posts');
    cy.get(`[data-testid=${TestIds.POSTS_ERROR}]`).should('be.visible');
  });

  it('should filter posts when using search input', () => {
    cy.fixture('data.json').then((mockResultItems) => {
      const firstPost = mockResultItems[0];
      cy.intercept('GET', `${API_BASE_URL}/posts`, {
        statusCode: 200,
        body: mockResultItems
      }).as('getPosts');

      cy.visit('/posts');
      cy.wait('@getPosts');

      cy.get(`[data-testid=${TestIds.POSTS_SEARCH_INPUT}]`).type(
        firstPost.title.substring(0, 10)
      );

      // Wait for debounce (1000ms as specified in the Vue component)
      cy.wait(1000);

      cy.get(`[data-testid=${TestIds.POSTS_ROW}]`).should(
        'have.length.at.least',
        1
      );
      cy.get(`[data-testid=${TestIds.POSTS_ROW_TITLE}]`)
        .first()
        .should('contain', firstPost.title.substring(0, 10));
    });
  });

  it('should show no results when search term matches nothing', () => {
    cy.fixture('data.json').then((mockResultItems) => {
      cy.intercept('GET', `${API_BASE_URL}/posts`, {
        statusCode: 200,
        body: mockResultItems
      }).as('getPosts');

      cy.visit('/posts');
      cy.wait('@getPosts');

      cy.get(`[data-testid=${TestIds.POSTS_SEARCH_INPUT}]`).type(
        'nonexistentposttext123456789'
      );

      // Wait for debounce
      cy.wait(1000);

      cy.get(`[data-testid=${TestIds.POSTS_ROW}]`).should('have.length', 0);
    });
  });
});
