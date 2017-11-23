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
    return stateTmp;
  }

  // Hopefully this is how one sets initial state
  state = this.getResetValues(); // initial state

  handleReset = () => {
    clearInterval(this.timer);
    this.timer = undefined; // would null be preferred?
    this.setState(this.getResetValues());
  }

  // internal method
  adjustTimerLength = (modeToAdjust, direction) => {
    // console.log("modeToAdjust =", modeToAdjust + ',', "direction is", direction);
    // console.log('Timer.adjustTimerLength(): this.state = ', this.state);

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

  doClockTick = () => {
    // console.log(this);
    //  this.setState({totalSeconds: this.state.totalSeconds - 1});
    // console.log("doClockTick - 'this.state' is", this.state);
    var newCount = this.state.totalSeconds - 1;
    if (newCount > 0) {
      this.setState({totalSeconds: newCount});
    }
    else {
      // timer has run out - switch timer modes and restart
      clearInterval(this.timer);
      // document.getElementById('beep').play(); // sound unimplemented
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

  handleStatusChange = () => {
    // the play/pause button was clicked
    // console.log("handleStatusChange - 'this.state' is", this.state);
    switch (this.state.countdownStatus) {
      case 'stopped':
        this.setState( {countdownStatus: 'running'} );
        this.timer = setInterval(this.doClockTick, 1000);
        break;
      case 'running':
        clearInterval(this.timer);
        this.setState( {countdownStatus: 'stopped'} );
        break;
      // blargh blargh blargh
      //   this.timer.clearInterval();
      //   if (this.state.totalSeconds === 0)
      // blargh blargh blargh
      //   the various cases -
      //   -- catch when timer goes to zero while counting (no click involved) but
      //      this is the only(?) place you switch between timer and break
      //   -- click - state is running and timer not zero - becomes pause
      //   -- click - state is running and timer is zero - corner case of
      //        clicking just as timer went to zero.  Switch session <-> break but dont start
      //   -- click - state is stopped
      //   -- click - state is paused - restart timer at current totalSec (what about if its zero?)
      // blargh blargh blargh
      //   break;
      // case 'paused':
      //   alert('timer::handleStatusChange() unexpected countdownStatus: paused');
    }
  };

  render() {
    // console.log("Timer.render() - 'this.state' is", this.state);
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
        
        <Controls
          countdownStatus={this.state.countdownStatus}
          onStatusChange={this.handleStatusChange}
          onReset={this.handleReset}
        />
      </div>
    );
  }
}
