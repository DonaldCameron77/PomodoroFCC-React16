import React from 'react';

// do we actually need/use .header__title?

const Header = (props) => (
  <div className="header">
    <div className="container">
      <h1 className="header__title">Pomodoro Clock</h1>
      {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
      {/* <h2>a freeCodeCamp challenge</h2> */}
    </div>
  </div>
);

Header.defaultProps = {
  subtitle: "a freeCodeCamp challenge"
}

export default Header;