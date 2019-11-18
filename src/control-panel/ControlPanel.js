import React from 'react';
import PropTypes from 'prop-types';

import './ControlPanel.css';

const ControlPanel = ({
  activeWord,
  handleBoldClick,
  handleUnderlineClick,
  handleItalicClick,
  boldWords,
  italicWords,
  underlineWords,
  suggestions
}) => {
  const getIsActive = words => words.includes(activeWord) ? 'active' : '';

  return (
    <div id='control-panel'>
      <div id='format-actions'>
        <div className='text-format'>
          <button
            disabled={!activeWord}
            onClick={handleBoldClick}
            className={`format-action ${getIsActive(boldWords)}`}
            type='button'
          >
            <b>
              B
            </b>
          </button>
          <button
            disabled={!activeWord}
            onClick={handleItalicClick}
            className={`format-action ${getIsActive(italicWords)}`}
            type='button'
          >
            <i>
              I
            </i>
          </button>
          <button
            disabled={!activeWord}
            onClick={handleUnderlineClick}
            className={`format-action ${getIsActive(underlineWords)}`}
            type='button'
          >
            <u>
              U
            </u>
          </button>
        </div>
        <div className='suggestions'>
          {suggestions.map(suggestion => (
            <button
              className='format-action'
              key={suggestion.word}
              onClick={() => {alert('not implemented')}}
            >
              {suggestion.word}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
};
ControlPanel.propTypes = {
  activeWord: PropTypes.string.isRequired,
  handleBoldClick: PropTypes.func.isRequired,
  handleUnderlineClick: PropTypes.func.isRequired,
  handleItalicClick: PropTypes.func.isRequired,
  boldWords: PropTypes.array.isRequired,
  italicWords: PropTypes.array.isRequired,
  underlineWords: PropTypes.array.isRequired
};

export default ControlPanel;
