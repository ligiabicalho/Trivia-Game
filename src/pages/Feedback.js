import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          Feedback
        </p>
      </>
    );
  }
}

export default Feedback;
