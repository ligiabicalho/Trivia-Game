import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testes do componente Login', () => {
  it('Deve existir um campo para digitar o Username e Email e deve ser possivel digitar neles', () => {
    renderWithRouterAndRedux(<App />);
    const usernameInput = screen.getByTestId('input-player-name');
    expect(usernameInput).toBeInTheDocument();
    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(emailInput).toBeInTheDocument();
    userEvent.type(usernameInput, 'teste');
    userEvent.type(emailInput, 'teste@gmail.com');
    expect(usernameInput.value).toBe('teste');
    expect(emailInput.value).toBe('teste@gmail.com');
  });
  it('O botão play deve estar desabilitado ao iniciar a pagina', () => {
    renderWithRouterAndRedux(<App />);
  });
  it('O botão play continua desabilitado se o usuario digitar apenas o nome', () => {
    renderWithRouterAndRedux(<App />);
    const usernameInput = screen.getByTestId('input-player-name');
    userEvent.type(usernameInput, 'Username');
    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeDisabled();
  });
  it('O botão play continua desabilitado se o usuario digitar apenas o email', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, 'username@gmail.com');
    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeDisabled();
  });
  it('O botão play só deve estar habilitado se o username e o email forem validos', () => {
    renderWithRouterAndRedux(<App />);
    const usernameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(usernameInput, 'Username');
    userEvent.type(emailInput, 'username@gmail.com');
    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
    expect(playButton).not.toBeDisabled();
  });
  it('Tendo username e emails validos, ao clicar em play, é redirecionado para a pagina Game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const usernameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(usernameInput, 'Username');
    userEvent.type(emailInput, 'username@gmail.com');
    const playButton = screen.getByTestId('btn-play');
    userEvent.click(playButton);
    await waitFor(() => expect(history.location.pathname).toBe('/game'));
  });
  it('Deve existir um botão para acessar as configurações, e ao ser clicado, deve redirecionar a /settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByTestId('btn-settings');
    expect(settingsButton).toBeInTheDocument();
    userEvent.click(settingsButton);
    expect(history.location.pathname).toBe('/settings');
  });
});
