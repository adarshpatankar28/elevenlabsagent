'use client';

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSpeak = async () => {
    if (!text) return;
    setLoading(true);

    const response = await fetch('/api/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const buffer = await response.arrayBuffer();
    const blob = new Blob([buffer], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();

    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🎤 ElevenLabs Voice Agent</h1>
      <textarea
        rows={4}
        cols={50}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to speak..."
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      />
      <br />
      <button onClick={handleSpeak} disabled={loading || !text}>
        {loading ? 'Speaking...' : 'Speak'}
      </button>
    </main>
  );
}

