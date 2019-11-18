import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './EditorZone.css';

const EditorZone = ({
  activeWord,
  setActiveWord,
  boldWords,
  italicWords,
  underlineWords
}) => {
  const [textValue, setTextValue] = useState('');

  const handleWordClick = (word) => {
    setActiveWord(word);
  };

  const computeClassNames = (word, index) => {
    const wordId = `${word}_${index}`;
    let className = '';

    if (activeWord === wordId) className = 'active';
    if (boldWords.includes(wordId)) className = `${className} bold`;
    if (italicWords.includes(wordId)) className = `${className} italic`;
    if (underlineWords.includes(wordId)) className = `${className} underline`;

    return className;
  };

  return (
    <div id='editor-zone'>
      <div id='editor'>
        {textValue.split(' ').map((word, index) => (
          <Fragment key={`${word}_${index}`}>
            <span
              onClick={() => handleWordClick(`${word}_${index}`)}
              className={`word ${computeClassNames(word, index)}`}
            >
              {word}
            </span>
            <span>&nbsp;</span>
          </Fragment>
        ))}
      </div>
      <textarea
        rows={10}
        onChange={event => setTextValue(event.target.value)}
      />
    </div>
  );
};
EditorZone.propTypes = {
  activeWord: PropTypes.string.isRequired,
  setActiveWord:  PropTypes.func.isRequired,
  boldWords: PropTypes.array.isRequired,
  italicWords: PropTypes.array.isRequired,
  underlineWords: PropTypes.array.isRequired
};

export default EditorZone;
