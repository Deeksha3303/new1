import React from 'react';
import './Modal.css'; // Make sure to update the CSS for modal styling

function Modal({ status, target }) {
  const getMessage = () => {
    if (status === 'win') {
      return (
        <>
          <h2 className="modal-message win-message">
            Yaay, you got it ^^
          </h2>
          <p className="modal-extra">Happy Birthday Nidhi &lt;3</p>
        </>
      );
    } else if (status === 'lose') {
      return (
        <>
          <h2 className="modal-message lose-message">
            Try again!
          </h2>
          <p className="modal-extra">Happy Birthday Nidhi &lt;3</p>
        </>
      );
    }
    return null; // No message before the game is over
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {getMessage()}
      </div>
    </div>
  );
}

export default Modal;
