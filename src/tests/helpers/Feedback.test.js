import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import Feedback from '../../pages/Feedback';
import userEvent from '@testing-library/user-event';
import App from '../../App';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Testes do componente Feedback', () => {
  it('Deve possuir uma imagem do perfil, o nome da pessoa e o placar atual', () => {
    renderWithRouterAndRedux(<Feedback />);
    const profilePicture = screen.getByTestId('header-profile-picture');
    expect(profilePicture).toBeInTheDocument();
    const username = screen.getByTestId('header-player-name');
    expect(username).toBeInTheDocument();
    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();
  });
  it('Deve existir um elemento que mostra o total de pontos e o número de perguntas acertadas', () => {
    renderWithRouterAndRedux(<Feedback />);
    const totalScore = screen.getByTestId('feedback-total-score');
    const totalQuestions = screen.getByTestId('feedback-total-question');
    expect(totalScore).toBeInTheDocument();
    expect(totalQuestions).toBeInTheDocument();
  });
  it('Deve existir um botão para a pessoa poder jogar novamente e voltar a tela de login ao ser clicado', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
    const playAgainButton = screen.getByTestId('btn-play-again');
    expect(playAgainButton).toBeInTheDocument();
    userEvent.click(playAgainButton);
    expect(history.location.pathname).toBe('/');
  });
});
