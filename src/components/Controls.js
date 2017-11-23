import React from 'react';

class Controls extends React.Component {
  onStatusChange () {
    return () => {
      this.props.onStatusChange();
    }
  }
  onReset () {
    return () => {
      this.props.onReset();
    }
  }
  render () {
    let {countdownStatus} = this.props;
    return (
      <div id="controls-container">
        <div className="controls">
          <button type="button" name="button" id="start_stop" onClick={this.onStatusChange()}>
            {/* <i className={countdownStatus === 'running' ? 'fi-pause' : 'fi-play'}></i> */}
            <p>{countdownStatus === 'running' ? 'Pause' : 'Play'}</p>
          </button>
        </div>
        <div className="controls">
          <button type="button" name="button" id="reset" onClick={this.onReset()}>
            {/* <i className="fi-loop"></i> */}
            <p>Reset</p>
          </button>
        </div>
      </div>
    );
  }
};

export default Controls;