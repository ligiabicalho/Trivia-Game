import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import Game from '../../pages/Game'

describe('Testes do componente Game', () => {
  it('Deve possuir um um componente Header com uma imagem, nome do usuario e um placar', async () => {
    renderWithRouterAndRedux(<Game />)
    const headerImage = await screen.findByTestId('header-profile-picture');
    const headerUsername = await screen.findByTestId('header-player-name');
    const headerScore = await screen.findByTestId('header-score');
    expect(headerImage).toBeInTheDocument();
    expect(headerUsername).toBeInTheDocument();
    expect(headerScore).toBeInTheDocument();
    expect(headerScore.innerHTML).toBe('Score: 0');
  });
});
