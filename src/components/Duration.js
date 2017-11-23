import React from 'react';

/*  This is a duration decrement/increment block consisting of label
    (either 'Break Length' or 'Session Length') on one line, while on
    the next line we have down arrow (decrement), amount (in whole minutes),
    and up arrow (increment).

    The items that need to be parameterized (all of these are props
    except the duration amount)

    IDs: break-label/session-label
         break-decrement/session-decrement,
         break-increment/session-increment
         break-length/session-length

    Programmable Entities:
        label text (Break Label or Session Label)
        duration amount (which is state)

    There is also the question of how this component "knows" that when an arrow is
    clicked, it is affecting break length vs. session length.  Answer: It doesn't
    have to.  The prop passed in to call on click is the correct function (or
    correctly parameterized function).
*/

const Duration = (props) => (
  <div>
    <label id={props.labelId}>{props.typeLabel}</label>
    <button type="button" name="button" id={props.downArrowId}
        value="-" onClick={props.onChangeDuration} >
        {/* <i className="fi-arrow-down"></i> */}
        <p>Down arrow</p>
    </button>
    <span id={props.durationId}>{props.currentDuration}</span>
    <button type="button" name="button" id={props.upArrowId}
        value="+" onClick={props.onChangeDuration} >
        {/* <i className="fi-arrow-up"></i> */}
        <p>Up arrow</p>
    </button>
  </div>
);

export default Duration;
