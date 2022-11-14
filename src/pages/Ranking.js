import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Button dataTestId="btn-go-home" btnName="Home" history={ history } />
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
