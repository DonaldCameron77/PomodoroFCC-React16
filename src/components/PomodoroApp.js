import React from 'react';

import Header from './Header';
import Timer from './Timer';

export default class PomodoroApp extends React.Component {
  render() {
    return (
      <div>
        <p>Pomodoro App says 'Greetings from Paradise!'</p>
        <Header/>
        <Timer/>
      </div>
    )
  }
}