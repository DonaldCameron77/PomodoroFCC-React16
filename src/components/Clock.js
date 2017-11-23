import React from 'react';

class Clock extends React.Component {

  formatSeconds = (totalSeconds) => {
    let seconds = totalSeconds % 60,
        minutes = Math.floor(totalSeconds / 60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return minutes + ':' + seconds;
  };

  render() {
    // console.log("Clock: totalSeconds is", this.props.totalSeconds);
    var {totalSeconds, timerLabel} = this.props;
    return (
      <div id="clock-dial">
        <h2 id="timer-label">{timerLabel}</h2>
        <div id="time-left">
          {this.formatSeconds(totalSeconds)}
        </div>
        {/* <span id="time-left">
          {this.formatSeconds(totalSeconds)}
        </span> */}
      </div>
    );
  }
};

Clock.defaultProps = {
    totalSeconds: 0,
    timerLabel: "Session"
};

export default Clock;


