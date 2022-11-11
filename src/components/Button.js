import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  redirectPage = () => {
    const { btnName, history } = this.props;
    if (btnName === 'Play Again') {
      history.push('/');
    }
    if (btnName === 'Ranking') {
      history.push('/ranking');
    }
    // switch (btnName) {
    // case 'Play Again':
    //   return history.push('/');
    // case 'Ranking':
    //   return history.push('/ranking');
    // default:
    //   return 'error';
    // }
  };

  render() {
    const { dataTestId, btnName } = this.props;
    return (
      <button
        type="button"
        data-testid={ dataTestId }
        onClick={ this.redirectPage }
      >
        { btnName }
      </button>
    );
  }
}

Button.propTypes = {
  dataTestId: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Button;
