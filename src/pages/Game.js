import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import logo from '../trivia.png';
import { addLocalStorage } from '../services/localStorage';
import { fetchQuestions } from '../services/fetchAPI';
import '../App.css';
import { actionCountScore } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      contador: 0,
      triviaResult: [],
      pack: {},
      isActive: false,
      timer: 30,
      antiLoop: true,
    };
  }

  async componentDidMount() {
    await this.fetchTrivia();
    this.startTimer();
  }

  componentDidUpdate() {
    const { timer, antiLoop } = this.state;
    if (timer === 0 && antiLoop) {
      this.stopTimer();
      this.setState({
        antiLoop: false,
      });
    }
  }

  createRank = () => {
    const { userName, score, userEmail } = this.props;
    const userData = { userName, score, userEmail };
    addLocalStorage(userData);
  };

  nextFeedback = () => {
    const { contador } = this.state;
    const { history } = this.props;
    const four = 4;
    if (contador >= four) {
      this.createRank();
      history.push('/feedback');
    }
  };

  stopTimer = () => {
    clearInterval(this.intervalID);
    this.setState({
      isActive: true,
    });
  };

  startTimer = () => {
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prev) => ({
        timer: prev.timer - 1,
      }));
    }, ONE_SECOND);
  };

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
    this.nextFeedback();
    this.setState((prevState) => ({
      contador: prevState.contador + 1,
      isActive: false,
      timer: 30,
      antiLoop: true,
    }), () => this.sortAnswers());
    this.startTimer();
  };

  calcDificulty = () => {
    const { triviaResult, contador } = this.state;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    switch (triviaResult[contador].difficulty) {
    case 'hard':
      return hard;
    case 'medium':
      return medium;
    case 'easy':
      return easy;
    default:
      return 0;
    }
  };

  countScore = () => {
    const { dispatch } = this.props;
    const { timer } = this.state;
    const difficulty = this.calcDificulty();
    const ten = 10;
    const score = ten + (timer * difficulty);
    dispatch(actionCountScore(score));
  };

  changeColors = ({ target }) => {
    this.stopTimer();
    this.setState({
      isActive: true,
    });
    if (target.name === 'correct-answer') {
      this.countScore();
    }
  };

  render() {
    const { contador,
      triviaResult,
      pack,
      isActive,
      timer,
    } = this.state;
    const four = 4;
    return (
      <div className="Pages">
        <div className="Game">
          <img src={ logo } className="App-logo" alt="logo" />
          <Header />
          <div>
            {contador <= four && triviaResult?.length > 0
              ? (
                <div>
                  <h3
                    data-testid="question-category"
                  >
                    {triviaResult[contador].category}
                  </h3>
                  <p>
                    Time Left:
                    {' '}
                    { timer }
                    {' '}
                    seconds
                  </p>
                  <h2
                    className="Question-game"
                    data-testid="question-text"
                  >
                    {triviaResult[contador].question}

                  </h2>
                  <div data-testid="answer-options">
                    {pack.answers?.map((answer, index) => (
                      answer === pack.correct_answer
                        ? (
                          <button
                            key={ index }
                            type="button"
                            data-testid="correct-answer"
                            className={ isActive ? 'btn_verde' : 'Button-game' }
                            name="correct-answer"
                            onClick={ this.changeColors }
                            disabled={ isActive }
                          >
                            {answer}
                          </button>
                        )
                        : (
                          <button
                            key={ index }
                            type="button"
                            data-testid={ `wrong-answer-${index}` }
                            className={ isActive ? 'btn_vermelho' : 'Button-game' }
                            name="wrong-answer"
                            onClick={ this.changeColors }
                            disabled={ isActive }
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
            <button
              className="Button-next"
              type="button"
              onClick={ this.nextQuestion }
              data-testid="btn-next"
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (globalState) => ({
  userEmail: globalState.player.gravatarEmail,
  userName: globalState.player.name,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Game);
