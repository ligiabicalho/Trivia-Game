import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';
import logo from '../trivia.png';

class Feedback extends React.Component {
  render() {
    const { score, assertions, history } = this.props;
    const couldBeBetterLimit = 3;
    const feedbackText = assertions < couldBeBetterLimit
      ? 'Could be better...'
      : 'Well Done!';
    return (
      <div className="Pages">
        <div className="Feedback">
          <img src={ logo } className="App-logo" alt="logo" />
          <Header />
          <h2 data-testid="feedback-text">
            {feedbackText}
          </h2>
          <p data-testid="feedback-total-score">
            Score:
            {score}
          </p>
          <p data-testid="feedback-total-question">
            Correct Answers:
            {assertions}
          </p>
          <Button dataTestId="btn-play-again" btnName="Play Again" history={ history } />
          <Button dataTestId="btn-ranking" btnName="Ranking" history={ history } />
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  score: player.score,
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
