import React, { useState } from 'react';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import './i18n';


const App = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  return (
    <div>
      <Header />
      <Main teams={teams} setTeams={setTeams} players={players} setPlayers={setPlayers} />
      <Footer />
    </div>
  );
};

export default App;
