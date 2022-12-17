import React, { useState } from 'react';
import { Close } from '@mui/icons-material/';
import './chatGPT.css';

const ChatGPT = ({ setShowChatGPT }) => {
  const [query, setQuery] = useState(''); // submitted by user
  const [result, setResult] = useState(); // chatGPT's response

  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setResult(null);
    const fetchCompletions = async () => {
      try {
        const res = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: `List three tasks to do regarding ${query}`,
            model: 'text-davinci-002',
            max_tokens: 50,
            temperature: 0.5,
          }),
        });
        const json = await res.json();
        console.log(json);
        setResult(json.choices[0].text);
        setError(null);
      } catch (e) {
        setError(e);
      }
    };
    fetchCompletions();
  }

  return (
    <div className="chatGPT-container">
      <h5>Don't know what to do? Ask for some help...</h5>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="animal"
          placeholder="Name a topic.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Ask ChatGPT</button>
        <Close id="chatGPT-close" onClick={() => setShowChatGPT(false)} />
      </form>
      <div className="result-container">
        {error ? <>`An error occured: ${error}`</> : result}
      </div>
    </div>
  );
};

export default ChatGPT;
