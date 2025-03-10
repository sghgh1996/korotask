const TEST_IDS = {
  // Posts List
  POSTS_LOADING: 'postsLoading',
  POSTS_ERROR: 'postsError',
  POSTS_CONTAINER: 'postsContainer',
  POSTS_SEARCH_INPUT: 'postsSearchInput',

  // Posts Row
  POSTS_ROW: 'postsRow',
  POSTS_ROW_TITLE: 'postsRowTitle',
  POSTS_ROW_BODY: 'postsRowBody',
  POSTS_ROW_AUTHOR: 'postsRowAuthor',

  // Post Table
  POST_DELETE_BUTTON: 'postDeleteButton',
  POST_EDIT_BUTTON: 'postEditButton',

  // New Post Page
  NEW_POST_PAGE_LOADING: 'newPostPageLoading',
  NEW_POST_PAGE_ERROR: 'newPostPageError',

  // Post Form
  POST_FORM: 'postForm',
  POST_FORM_TITLE: 'postFormTitle',
  POST_FORM_BODY: 'postFormBody',
  POST_FORM_AUTHOR: 'postFormAuthor',
  POST_FORM_SUBMIT: 'postFormSubmit'
} as const;

export default TEST_IDS;
