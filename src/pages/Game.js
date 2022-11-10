import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../services/fetchAPI';
import '../App.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      contador: 0,
      triviaResult: [],
      pack: {},
      isActive: false,
    };
  }

  async componentDidMount() {
    await this.fetchTrivia();
  }

  fetchTrivia = async () => {
    const { history } = this.props;
    const data = await fetchQuestions();
    const errorCode = 3;
    if (data.response_code === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      triviaResult: data.results,
    }, () => this.sortAnswers());
  };

  sortAnswers = () => {
    const { contador, triviaResult } = this.state;
    const random = 0.5;
    const answers = [triviaResult[contador].correct_answer,
      ...triviaResult[contador].incorrect_answers].sort(() => Math.random() - random);
    this.setState({
      pack: {
        answers,
        contador,
        correct_answer: triviaResult[contador].correct_answer,
      },
    });
  };

  nextQuestion = () => {
    this.setState((prevState) => ({
      contador: prevState.contador + 1,
      isActive: false,
    }), () => this.sortAnswers());
  };

  changeColors = () => {
    this.setState({
      isActive: true,
    });
  };

  render() {
    const { contador,
      triviaResult,
      pack, isActive,
    } = this.state;
    return (
      <div className="Game">
        <Header />
        <div>
          {triviaResult?.length > 0
            ? (
              <div>
                <h1 data-testid="question-category">{triviaResult[contador].category}</h1>
                <p data-testid="question-text">{triviaResult[contador].question}</p>
                <div data-testid="answer-options">
                  {pack.answers?.map((answer, index) => (
                    answer === pack.correct_answer
                      ? (
                        <button
                          key={ index }
                          type="button"
                          data-testid="correct-answer"
                          className={ isActive ? 'btn_verde' : null }
                          onClick={ this.changeColors }
                        >
                          {answer}
                        </button>
                      )
                      : (
                        <button
                          key={ index }
                          type="button"
                          data-testid={ `wrong-answer-${index}` }
                          className={ isActive ? 'btn_vermelho' : null }
                          onClick={ this.changeColors }
                        >
                          {answer}
                        </button>
                      )
                  ))}
                </div>
              </div>
            )

            : <p>Loading...</p>}

        </div>
        { isActive
          && (
            <button type="button" onClick={ this.nextQuestion } data-testid="btn-next">
              Next
            </button>
          )}
      </div>
    );
  }
}
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null)(Game);
