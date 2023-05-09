import { useState, useEffect } from 'react';
import './TimespanButtons.css';


/* 
  Component of 5 buttons.
  props.title: array of button text
  props.parentFunction(index): function that is called after button press
  index is button nummber 0-4

*/
export default function TimespanButtons(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [activeButton, setActiveButton] = useState(0);

  // This function is called when a button is clicked
  // Changes active button and calls parent function
  const handleButtonClick = (index) => {
    setActiveButton(index);
    props.parentFunction(index);
  }

  // Update the disabled feature on the button. 
  // Buttons are disabled by default and re-enabled as data comes in.
  useEffect(() => {
    setIsDisabled(props.isDisabled);
  }, [props.isDisabled]);

  return(
    <div className="button-group">
      <button disabled={isDisabled} className={`button ${activeButton === 0 ? "active" : ''}`} onClick={() => handleButtonClick(0)}>{props.title[0]}</button>
      <button disabled={isDisabled} className={`button ${activeButton === 1 ? "active" : ''}`} onClick={() => handleButtonClick(1)}>{props.title[1]}</button>
      <button disabled={isDisabled} className={`button ${activeButton === 2 ? "active" : ''}`} onClick={() => handleButtonClick(2)}>{props.title[2]}</button>
      <button disabled={isDisabled} className={`button ${activeButton === 3 ? "active" : ''}`} onClick={() => handleButtonClick(3)}>{props.title[3]}</button>
      <button disabled={isDisabled} className={`button ${activeButton === 4 ? "active" : ''}`} onClick={() => handleButtonClick(4)}>{props.title[4]}</button>
    </div>
  );
}
