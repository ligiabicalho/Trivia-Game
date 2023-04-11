import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { readUsersData } from '../services/localStorage';
import Button from '../components/Button';
import logo from '../trivia.png';

class Ranking extends React.Component {
  createRank = () => {
    const results = readUsersData();
    const sorted = results.sort((a, b) => b.score - a.score);
    return sorted;
  };

  render() {
    const { history } = this.props;
    this.createRank();
    return (
      <div className="Pages">
        <div className="Ranking">
          <img src={ logo } className="App-logo" alt="logo" />
          <h1 data-testid="ranking-title">Ranking</h1>
          <div>
            {this.createRank().map((el, index) => (
              <div
                className="Ranking-player"
                key={ el.userName }
              >
                <p data-testid={ `player-score-${index}` }>
                  SCORE:
                  {el.score}
                </p>
                <p data-testid={ `player-name-${index}` }>
                  PLAYER:
                  {el.userName}
                </p>
                <img
                  className="Header-img"
                  alt={ el.userEmail }
                  src={ `https://www.gravatar.com/avatar/${md5(el.userEmail).toString()}` }
                />
              </div>))}
          </div>
          <Button dataTestId="btn-go-home" btnName="Home" history={ history } />
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
