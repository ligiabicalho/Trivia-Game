import React from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import fetchApiToken from '../services/fetchAPI';
import saveLocalStorage from '../services/localStorage';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validation = () => {
    const { username, email } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const usernameValid = username.length > 0;
    return (emailRegex.test(email)
      && usernameValid);
  };

  handleClick = async () => {
    const { history } = this.props;
    const token = await fetchApiToken();
    saveLocalStorage('token', token);
    history.push('/game');
  };

  handleSettingsClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { username, email } = this.state;
    return (
      <div className="Login">
        <header className="Login-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <form>
          <label htmlFor="name-input">
            Nome:
            <input
              id="name-input"
              type="text"
              data-testid="input-player-name"
              name="username"
              value={ username }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email-input">
            E-mail:
            <input
              id="email-input"
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !this.validation() }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettingsClick }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
