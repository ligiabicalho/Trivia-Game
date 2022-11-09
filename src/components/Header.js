import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { gravatarEmail } = this.props;
    const gravata = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${gravata}`;
    return (
      <div className="Header">
        <img src={ url } alt="gravatar" />

      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
