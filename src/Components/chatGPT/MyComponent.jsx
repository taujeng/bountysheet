import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [completions, setCompletions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletions = async () => {
      try {
        const res = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: 'Return a javascript array containing three tasks to do at home',
            model: 'text-davinci-002',
            max_tokens: 50,
            temperature: 0.5,
          }),
        });
        const json = await res.json();
        console.log(json)
        setCompletions(json.choices[0].text);
      } catch (e) {
        setError(e);
      }
    };
    fetchCompletions();
  }, []);

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  } else if (!completions) {
    return <p>Loading...</p>;
  } else {
    return <p>Completion: {completions}</p>;
  }
};

export default MyComponent;
