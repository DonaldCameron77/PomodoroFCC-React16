import React from 'react';

import Duration from './Duration';
import Clock from './Clock';
import Controls from './Controls';

/*
All of these are props (to be sent down to Duration) except duration amount

IDs: break-label/session-label
     break-decrement/session-decrement,
     break-increment/session-increment
     break-length/session-length

Programmable Entities:
    label text (Break Label or Session Label)
    duration amount (which is state)

The title text and footer are inline.
*/

// The states from Andrew's Timer App are started, stopped, and paused.
// We are going to use 'running' and 'stopped.'
// We don't want to use the term 'state' as it has special meaning for
// React, so we'll call it countdownStatus ala Andrew)
// -- dcc 2017-04

export default class Timer extends React.Component {
  
  getResetValues = () => {
    var stateTmp = {
      breakLength: 5,
      sessionLength: 25,
      timerLabel: 'Session',
      countdownStatus: 'stopped'
    };
    // have to resort to this to make totalSeconds computable in JS,
    // and can't do computation in an object literal
    stateTmp.totalSeconds = stateTmp.sessionLength * 60;
    return stateTmp;
  };

  // Hopefully this is how one sets initial state
  state = this.getResetValues(); // initial state

  // HOW DO BREAK AND SESSION LENGTH GET INITIALIZED?
  render() {
    return (
      <div>
        <p>"  Hi! Timer is here"</p>
        <Duration
          typeLabel="Break Length"
          labelId="break-label"
          downArrowId="break-decrement"
          upArrowId="break-increment"
          durationId="break-length"
          currentDuration={this.state.breakLength}
          onChangeDuration={this.handleBreakLengthChange}
        />
        <Duration
          typeLabel="Session Length"
          labelId="session-label"
          downArrowId="session-decrement"
          upArrowId="session-increment"
          durationId="session-length"
          currentDuration={this.state.sessionLength}
          onChangeDuration={this.handleSessionLengthChange}
        />
        <Clock />
        <Controls />
      </div>
    );
  }
}
