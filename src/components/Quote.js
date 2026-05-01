import React, { useEffect, useState } from 'react';

const Quote = ({ triggerFetch }) => {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Default quote jika API gagal
  const defaultQuotes = [
    {
      q: "Suksesmu adalah hasil dari kerja kerasmu sendiri.",
      a: "Anonymous"
    },
    {
      q: "Jangan menyerah pada mimpimu, terus berusaha dan percaya diri.",
      a: "Anonymous"
    },
    {
      q: "Setiap tantangan adalah peluang untuk tumbuh lebih baik.",
      a: "Anonymous"
    },
    {
      q: "Kegagalan adalah batu loncatan menuju kesuksesan.",
      a: "Anonymous"
    }
  ];

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://zenquotes.io/api/random');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      // API ZenQuotes mengembalikan array dengan satu object
      if (data && data.length > 0) {
        setQuote(data[0].q);
        setAuthor(data[0].a || 'Unknown');
      }
    } catch (err) {
      // Jika API gagal, gunakan default quote
      console.log('API Error:', err.message);
      const randomQuote = defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)];
      setQuote(randomQuote.q);
      setAuthor(randomQuote.a);
      setError(null); // Set error ke null sehingga tetap menampilkan quotes
    } finally {
      setLoading(false);
    }
  };

  // Fetch quote ketika component mount atau triggerFetch berubah
  useEffect(() => {
    fetchQuote();
  }, [triggerFetch]);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md mb-6 border-l-4 border-blue-500">
        <p className="text-gray-500 text-center">Loading inspirasi untuk mu...</p>
      </div>
    );
  }

  if (!quote) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md mb-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-3">
        <p className="text-lg italic text-gray-700 leading-relaxed">
          "{quote}"
        </p>
        <p className="text-sm text-gray-600 text-right">
          — <span className="font-semibold">{author}</span>
        </p>
      </div>
      <button
        onClick={fetchQuote}
        className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
      >
        📌 Dapatkan Quote Baru
      </button>
    </div>
  );
};

export default Quote;
