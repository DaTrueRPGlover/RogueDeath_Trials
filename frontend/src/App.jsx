import React, { use, useEffect, useState } from "react";
import './App.css';

import killersData from './data/killers.json';
import killerPerksData from './data/killer_perks.json';


function App() {
  const [killers, setKillers] = useState(
    killersData.map((k, i) =>
      i === 0 ? { ...k, alive: false } : k // set first killer as dead for testing
    )
  );
  const [killerPerks, setKillerPerks] = useState(killerPerksData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKiller, setSelectedKiller] = useState(null);
  const [killerPerkQuery, setKillerPerkQuery] = useState("");
  const [selectedKillerPerk, setSelectedKillerPerk] = useState(null);

  function getRandomKiller() {
    const randomIndex = Math.floor(Math.random() * killers.length);
    return killers[randomIndex];
  }

  function killKiller(id) {
    setKillers(prevKillers =>
      prevKillers.map(killer =>
        killer.id === id ? { ...killer, alive: false } : killer
      )
    );
  }

  function reviveKiller(id) {
    setKillers(prevKillers =>
      prevKillers.map(killer =>
        killer.id === id ? { ...killer, alive: true } : killer
      )
    );
  }

  function handleSearchChange(setQuery) {
    return (e) => setQuery(e.target.value);
  }
  
  function handleSelect(item, setItem, setQuery) {
    return () => {
      setItem(item);
      setQuery("");
    };
  }   
  
  useEffect(() => {
    console.log(getRandomKiller());
    console.log(killerPerksData);
  }, []);

  function filterByName(list, query) {
    if (!query) return list;  // if no query, show full list
    const lowerQuery = query.toLowerCase();
    return list.filter(item => item.name.toLowerCase().includes(lowerQuery));
  }  

  const filteredKillers = filterByName(killers, searchQuery);
  const filteredKillerPerks = filterByName(killerPerks, searchQuery);

  return (
    <div className="min-h-screen p-6 text-white" data-theme="halloween">
      <h1 className="text-6xl font-bold mb-12">The RogueDeath Trials: A DBD Experience</h1>

      <div className="mb-12">
        <label className="label">
          <span className="label-text text-white text-xl">Search Killers</span>
        </label>
        <input
          type="text"
          placeholder="Type a killer's name..."
          className="input input-bordered w-full text-black"
          value={searchQuery}
          onChange={handleSearchChange(setSearchQuery)} // <- here
        />
        {searchQuery && (
          <ul className="mt-2 bg-base-100 text-black rounded shadow max-h-60 overflow-y-auto">
            {filteredKillers.length > 0 ? (
              filteredKillers.map(k => (
                <li
                  key={k.id}
                  onClick={handleSelect(k, setSelectedKiller, setSearchQuery)} // <- here
                  className="p-2 hover:bg-base-200 cursor-pointer"
                >
                  {k.name}
                </li>
              ))
            ) : (
              <li className="p-2 text-red-500">No killers found</li>
            )}
          </ul>
        )}
      </div>

      {selectedKiller && (
        <div className="mb-10 p-4 bg-base-200 rounded shadow">
          <h2 className="text-3xl font-bold mb-2">{selectedKiller.name}</h2>
          <p>Status: {selectedKiller.alive ? "Alive" : "Dead"}</p>
          <p>ID: {selectedKiller.id}</p>
        </div>
      )}

      <h2 className="text-4xl font-bold mb-4">All Killers</h2>
      <ul>
        {killers.map(killer => (
          <li key={killer.id} className="mb-2">
            {killer.name} — {killer.alive ? "Alive" : "Dead"}{" "}
            {killer.alive ? (
              <button
                onClick={() => killKiller(killer.id)}
                className="btn btn-error btn-sm ml-2"
              >
                Kill 💀
              </button>
            ) : (
              <button
                onClick={() => reviveKiller(killer.id)}
                className="btn btn-success btn-sm ml-2"
              >
                Revive 🫀
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
