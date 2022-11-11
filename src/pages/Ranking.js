import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  handleCLickHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <button
        type="button"
        testid="btn-go-home"
        onClick={ this.handleCLickHome }
      >
        Home
      </button>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
