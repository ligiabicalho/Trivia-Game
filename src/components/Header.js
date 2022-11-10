import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { gravatarEmail, name } = this.props;
    const gravatar = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${gravatar}`;
    return (
      <div className="Header">
        <img src={ url } alt="gravatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">Score: 0</p>

      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
