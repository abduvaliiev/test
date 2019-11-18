import React, { useState, useEffect } from 'react';

import ControlPanel from './control-panel/ControlPanel';
import EditorZone from './editor-zone/EditorZone';
import './App.css';

const App = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [request, setRequest] = useState({});
  const [suggestionsCache, setSuggestionsCache] = useState({});

  const [underlineWords, setUnderlineWords] = useState([]);
  const [boldWords, setBoldWords] = useState([]);
  const [italicWords, setItalicWords] = useState([]);
  const [activeWord, setActiveWord] = useState('');

  useEffect(() => {
    let xhr = {};

    setSuggestions(() => {
      return suggestionsCache[activeWord]
        ? suggestionsCache[activeWord]
        : [];
    });

    if (activeWord !== '' && !suggestionsCache[activeWord]) {
      xhr = new XMLHttpRequest();

      xhr.open('GET', `https://api.datamuse.com/words?ml=${activeWord.split('_')[0]}`);
      xhr.responseType = 'json';
      xhr.send();
      xhr.onload = function() {
        const data = xhr.response.slice(0, 3);

        setSuggestions(data);
        setSuggestionsCache({
          ...suggestionsCache,
          [activeWord]: data
        })
      };
    }

    setRequest(xhr);
  }, [activeWord]);

  useEffect(() => {
    request.abort && request.abort();
    setRequest({});
  }, [activeWord]);

  const handleUnderlineClick = () => {
    setUnderlineWords(() => {
      return underlineWords.includes(activeWord)
        ? [...underlineWords.filter(word => word !== activeWord)]
        : [...underlineWords, activeWord];
    });
  };
  const handleBoldClick = () => {
    setBoldWords(() => {
      return boldWords.includes(activeWord)
        ? [...boldWords.filter(word => word !== activeWord)]
        : [...boldWords, activeWord];
    });
  };
  const handleItalicClick = () => {
    setItalicWords(() => {
      return italicWords.includes(activeWord)
        ? [...italicWords.filter(word => word !== activeWord)]
        : [...italicWords, activeWord];
    });
  };

  return (
    <div className='App'>
      <header>
        <span>Simple Text Editor</span>
      </header>
      <main>
        <ControlPanel
          activeWord={activeWord}
          handleUnderlineClick={handleUnderlineClick}
          handleBoldClick={handleBoldClick}
          handleItalicClick={handleItalicClick}
          boldWords={boldWords}
          italicWords={italicWords}
          underlineWords={underlineWords}
          suggestions={suggestions}
        />
        <EditorZone
          activeWord={activeWord}
          setActiveWord={setActiveWord}
          boldWords={boldWords}
          italicWords={italicWords}
          underlineWords={underlineWords}
        />
      </main>
    </div>
  );
};

export default App;
