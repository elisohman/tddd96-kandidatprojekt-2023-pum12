import { useState } from 'react';
import './TimespanButtons.css';


/* 
  Component of 5 buttons.
  props.title: array of button text
  props.parentFunction(index): function that is called after button press
  index is button nummber 0-4

*/
export default function TimespanButtons(props) {

  const [activeButton, setActiveButton] = useState(null);

  // This function is called when a button is clicked
  // Changes active button and calls parent function
  const handleButtonClick = (index) => {
    setActiveButton(index);
    props.parentFunction(index);
  }



  return(
    <div className="button-group">
      <button className={`button ${activeButton == 0 ? "active" : ''}`} onClick={() => handleButtonClick(0)}>{props.title[0]}</button>
      <button className={`button ${activeButton == 1 ? "active" : ''}`} onClick={() => handleButtonClick(1)}>{props.title[1]}</button>
      <button className={`button ${activeButton == 2 ? "active" : ''}`} onClick={() => handleButtonClick(2)}>{props.title[2]}</button>
      <button className={`button ${activeButton == 3 ? "active" : ''}`} onClick={() => handleButtonClick(3)}>{props.title[3]}</button>
      <button className={`button ${activeButton == 4 ? "active" : ''}`} onClick={() => handleButtonClick(4)}>{props.title[4]}</button>
    </div>
  );
}
