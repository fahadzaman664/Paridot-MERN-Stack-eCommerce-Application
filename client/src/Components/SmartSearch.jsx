
import React, { useState } from "react";
import axios from "axios";

const SmartSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await axios.post("http://localhost:1000/api/search/smart-search", { query });
    setResults(res.data);
  };

  return (
    <div className="p-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search natural language..."
        className="border p-2 w-full"
      />
      <button onClick={handleSearch} className="bg-black text-white px-4 py-2 mt-2">
        Smart Search
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {results.map((product) => (
          <div key={product._id} className="border p-2">
            <img src={product.image} className="w-full h-40 object-cover" alt={product.title} />
            <p>{product.title}</p>
            <p className="text-sm text-gray-600">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartSearch;
