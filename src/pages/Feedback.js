import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { score, assertions } = this.props;
    const couldBeBetterLimit = 3;
    const feedbackText = assertions < couldBeBetterLimit
      ? 'Could be better...'
      : 'Well Done!';
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          {feedbackText}
        </p>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
      </>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  score: player.score,
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
