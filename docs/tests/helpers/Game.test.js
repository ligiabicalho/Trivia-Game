import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import Game from '../../pages/Game';
import { questionsResponse } from './mockData';
import userEvent from '@testing-library/user-event';

describe('Testes do componente Game', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(questionsResponse),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Deve possuir um um componente Header com uma imagem, nome do usuario e um placar', async () => {
    renderWithRouterAndRedux(<Game />, {}, '/game');
    const headerImage = await screen.findByTestId('header-profile-picture');
    const headerUsername = await screen.findByTestId('header-player-name');
    const headerScore = await screen.findByTestId('header-score');
    expect(headerImage).toBeInTheDocument();
    expect(headerUsername).toBeInTheDocument();
    expect(headerScore).toBeInTheDocument();
    expect(headerScore.innerHTML).toBe('0');
  });

  it('Deve existir uma categoria de pergunta, uma pergunta e alternativas', async () => {
    renderWithRouterAndRedux(<Game />, {}, '/game');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const questionCategory = await screen.findByTestId('question-category');
    expect(questionCategory).toBeInTheDocument();
    const username = await screen.findByTestId('header-player-name');
    expect(username).toBeInTheDocument();
    const score = await screen.findByTestId('header-score');
    expect(score).toBeInTheDocument();
  });
  it('Deve existir uma pergunta, uma alternativa certa e uma ou varias alternativas erradas', async () => {
    renderWithRouterAndRedux(<Game />, {}, '/game');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const questionText = await screen.findByTestId('question-text');
    expect(questionText).toBeInTheDocument();
    const answerOptions = await screen.findByTestId('answer-options');
    expect(answerOptions).toBeInTheDocument();
    const correctAnswer = await screen.findByTestId('correct-answer');
    expect(correctAnswer).toBeInTheDocument();
    const firstIncorrectAnswer = await screen.findByTestId(/wrong-answer/);
    expect(firstIncorrectAnswer).toBeInTheDocument();
  });
  it('Deve existir um botão next após clicar em uma alternativas, a certa deve ficar verde e as erradas vermelhas', async () => {
    renderWithRouterAndRedux(<Game />, {}, '/game');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    expect(correctAnswer).toBeDisabled();
    expect(correctAnswer).toHaveClass('btn_verde');
    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();
    userEvent.click(btnNext);
    const incorrectAnswers = await screen.findAllByTestId(/wrong-answer/);
    userEvent.click(incorrectAnswers[0]);
    expect(incorrectAnswers[0]).toHaveClass('btn_vermelho');
  });
});
