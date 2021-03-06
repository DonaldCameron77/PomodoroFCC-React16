import React from 'react';

// react-icon components, in lieu of icon fonts
import FaPlay from 'react-icons/fa/play';
import FaPause from 'react-icons/fa/pause';
import FaRefresh from 'react-icons/fa/refresh';

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
      <div id="controls-section">
        <div className="control">
          <button type="button" name="button" id="start_stop" onClick={this.onStatusChange()}>
            {/* <i className={countdownStatus === 'running' ? 'fi-pause' : 'fi-play'}></i> */}
            {/*<p>{countdownStatus === 'running' ? 'Pause' : 'Play'}</p>*/}
            { countdownStatus === 'running'
              ? <FaPause classname="control-icon"/>
              : <FaPlay classname="control-icon"/>
            }
          </button>
        </div>
        <div className="control">
          <button type="button" name="button" id="reset" onClick={this.onReset()}>
            {/* <i className="fi-loop"></i> */}
            {/* <p>Reset</p> */}
            <FaRefresh classname="control-icon"/>
          </button>
        </div>
      </div>
    );
  }
};

export default Controls;