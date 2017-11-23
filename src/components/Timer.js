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
    let stateTmp = {
      breakLength: 5,
      sessionLength: 25,
      timerLabel: 'Session',
      countdownStatus: 'stopped'
    };
    // have to resort to this to make totalSeconds computable in JS,
    // and can't do computation in an object literal
    stateTmp.totalSeconds = stateTmp.sessionLength * 60;
    console.log("get reset values", stateTmp);
    return stateTmp;
  }

  // Hopefully this is how one sets initial state
  state = this.getResetValues(); // initial state

  // internal method
  adjustTimerLength = (modeToAdjust, direction) => {
    console.log("modeToAdjust =", modeToAdjust + ',', "direction is", direction);
    console.log('Timer.adjustTimerLength(): this.state = ', this.state);

    if (this.state.countdownStatus === 'running') {
      return;
    }

    let currentLength = (modeToAdjust === 'Session')
      ? this.state.sessionLength : this.state.breakLength;

    if (direction === '-' && currentLength <= 1 ||
        direction === '+' && currentLength >= 60) {
      return;
    }

    currentLength += (direction === '-' ? -1 : +1);

    if (modeToAdjust === 'Session') {
      this.setState({sessionLength: currentLength});
    }
    else {
      this.setState({breakLength: currentLength});
    }

    // Are we updating the length for current timer mode? 
    // If so, the adjusted value becomes the new timer value
    if (this.state.timerLabel === modeToAdjust) {
      let newTotalSeconds = currentLength * 60;
      this.setState({totalSeconds: newTotalSeconds});
    }
  }; // adjustTimerLength

  handleBreakLengthChange = (e) => {
    this.adjustTimerLength('Break', e.currentTarget.value);
  };
  handleSessionLengthChange = (e) => {
    this.adjustTimerLength('Session', e.currentTarget.value);
  };

  doClockTick () {
    // console.log(this);
    //  this.setState({totalSeconds: this.state.totalSeconds - 1});
    var newCount = this.state.totalSeconds - 1;
    if (newCount > 0) {
      this.setState({totalSeconds: newCount});
    }
    else {
      // timer has run out - switch timer modes and restart
      clearInterval(this.timer);
      document.getElementById('beep').play();
      if (this.state.timerLabel === 'Session') {
        this.setState({
          timerLabel: 'Break',
          totalSeconds: this.state.breakLength * 60
        });
      }
      else {
        this.setState({
          timerLabel: 'Session',
          totalSeconds: this.state.sessionLength * 60
        });
      }
      // countdownStatus remains 'running'
      this.timer = setInterval(this.doClockTick, 1000);
    }
  };

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

        <Clock
          totalSeconds={this.state.totalSeconds}
          timerLabel={this.state.timerLabel}
        />
        
        <Controls />
      </div>
    );
  }
}
