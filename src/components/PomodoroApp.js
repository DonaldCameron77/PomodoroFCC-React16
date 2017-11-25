import React from 'react';

import Header from './Header';
import Timer from './Timer';

export default class PomodoroApp extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Timer/>
      </div>
    )
  }
}