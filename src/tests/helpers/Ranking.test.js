import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import App from '../../App';

describe('Testes do componente Ranking', () => {
  const localStorageMock = (function () {
    let store = {};
    return {
      getItem(key) {
        return store[key];
      },

      setItem(key, value) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key) {
        delete store[key];
      },

      getAll() {
        return store;
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  const usersData = [
    {
      userName: 'typhlero',
      score: 0,
      userEmail: 'tryber@teste.com',
    },
  ];

  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };

  afterEach(() => {
    window.localStorage.clear();
  });

  it('Deve existir um botão Home para voltar a pagina inicial', () => {
    setLocalStorage('usersData', usersData);
    expect(localStorage.getItem('usersData')).toEqual(
      JSON.stringify(usersData)
    );
    renderWithRouterAndRedux(<App />, {}, '/ranking');
    const homeButton = screen.getByTestId('btn-go-home');
    expect(homeButton).toBeInTheDocument();
  });
});
