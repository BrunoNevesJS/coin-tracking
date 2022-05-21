import { render } from '@testing-library/react'
import { MemoryRouter, BrowserRouter } from 'react-router-dom'

import { AppRouter } from 'routes';
import { findUrlByRoute } from 'tests/utils/routes';

describe("Testing routes and localStorage", () => {

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn().mockReturnValue('@auth'),
        setItem: jest.fn().mockResolvedValue('@auth')
      },
    });
  });

  it("should be able to render page not found", () => {
    const app = render(
      <MemoryRouter initialEntries={['/unknown']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(app.getByText(/NotFoundPage/i)).toBeInTheDocument();
  })

  it("should be able to render home page", async () => {
    const app = render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(app.asFragment().baseURI).toBe(await findUrlByRoute('/'));
  })

  it("should be snapshot getItem localSotrage", async () => {
    const getItem = localStorage.getItem;

    expect(getItem).toMatchSnapshot();
  })

});

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, '/', route);

  return render(ui,
    { wrapper: BrowserRouter }
  );
};

describe('Testing guard route', () => {

  beforeEach(() => {
    renderWithRouter(<AppRouter />);

    jest.spyOn(localStorage, 'getItem');
    jest.spyOn(localStorage, 'setItem');
  });

  it('should be called auth localstorage getItem', () => {
    jest.spyOn(localStorage, 'getItem');

    expect(localStorage.getItem).toBeCalledWith('@auth');
  });

  it('should deny navigation to location home and redirect to register', async () => {
    const app = render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(app.asFragment().baseURI).toBe(await findUrlByRoute('/register'));
  });
});