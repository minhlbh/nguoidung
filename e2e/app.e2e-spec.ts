import { NDTruongKhoaPage } from './app.po';

describe('ndtruong-khoa App', () => {
  let page: NDTruongKhoaPage;

  beforeEach(() => {
    page = new NDTruongKhoaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
