import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedback extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          Feedback
        </p>
        <Button dataTestId="btn-play-again" btnName="Play Again" history={ history } />
        <Button dataTestId="btn-ranking" btnName="Ranking" history={ history } />
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Feedback;
