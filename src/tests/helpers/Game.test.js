import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import {  screen, findByTestId  } from '@testing-library/react';
import Game from '../../pages/Game';
import userEvent from '@testing-library/user-event';
import App from '../../App'
import mockToken from './mockToken'
import mockData from './mockData'

describe('Testes do componente Game', () => {
  it('Deve possuir um um componente Header com uma imagem, nome do usuario e um placar', async () => {
    renderWithRouterAndRedux(<Game />);
    const headerImage = await screen.findByTestId('header-profile-picture');
    const headerUsername = await screen.findByTestId('header-player-name');
    const headerScore = await screen.findByTestId('header-score');
    expect(headerImage).toBeInTheDocument();
    expect(headerUsername).toBeInTheDocument();
    expect(headerScore).toBeInTheDocument();
    expect(headerScore.innerHTML).toBe('Score: 0');
  });

  it('Deve existir uma categoria de pergunta, uma pergunta e alternativas', async () => {
    renderWithRouterAndRedux(<Game />);
    jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
  expect(global.fetch).toHaveBeenCalled()
    const questionCategory = await screen.findByTestId('question-category');
    expect(questionCategory).toBeInTheDocument()
  });
});
