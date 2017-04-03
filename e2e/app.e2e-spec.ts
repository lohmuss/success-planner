import { SuccessPage } from './app.po';

describe('success App', function() {
  let page: SuccessPage;

  beforeEach(() => {
    page = new SuccessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
