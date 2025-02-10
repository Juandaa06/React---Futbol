import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Main = ({ teams, setTeams, players, setPlayers }) => {

  const { t } = useTranslation(); // Esta línea debería funcionar ahora
  
  const [teamName, setTeamName] = useState('');
  const [teamLogo, setTeamLogo] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [playerAge, setPlayerAge] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');
  const [playerTeam, setPlayerTeam] = useState('');
  const [playerPhoto, setPlayerPhoto] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Agregar equipo
  const handleAddTeam = (e) => {
    e.preventDefault();
    if (!teamName) {
      alert("El nombre del equipo es obligatorio");
      return;
    }

    const logo = teamLogo ? URL.createObjectURL(teamLogo) : "assets/images/default-team.jpg";
    setTeams([...teams, { name: teamName, logo }]);
    setTeamName('');
    setTeamLogo(null);
  };

  // Agregar jugador
  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!playerName || !playerAge || !playerPosition || !playerTeam) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const photo = playerPhoto ? URL.createObjectURL(playerPhoto) : "assets/images/default-player.jpg";
    setPlayers([...players, { name: playerName, age: playerAge, position: playerPosition, team: playerTeam, photo }]);
    setPlayerName('');
    setPlayerAge('');
    setPlayerPosition('');
    setPlayerTeam('');
    setPlayerPhoto(null);
  };

  // Manejo de búsqueda
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Ingrese un término de búsqueda");
      return;
    }
    alert(`Buscando: ${searchQuery}`);
  };

  return (
    <main>
      {/* Formulario para agregar equipos */}
      <h1 className="jugadores">{t('add_team')}</h1>
      <form onSubmit={handleAddTeam}>
        <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder={t('add_team_pc')} />
        <input type="file" onChange={(e) => setTeamLogo(e.target.files[0])} />
        <button type="submit">{t('add_team')}</button>
      </form>

      {/* Lista de equipos */}
      <div>
        <h1 class="list-equipos">{t('teams')}</h1>
        <br></br>
        {teams.map((team, index) => (
          <div key={index} className="team-card">
            <img src={team.logo} alt={team.name} style={{ width: 100, height: 100, borderRadius: '50%' }} />
            <h3>{team.name}</h3>
          </div>
        ))}
      </div>

      {/* Formulario para agregar jugadores */}
      <h1 className="jugadores">{t('add_player')}</h1>
      <form onSubmit={handleAddPlayer}>
        <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder={t('name_player')} />
        <input type="number" value={playerAge} onChange={(e) => setPlayerAge(e.target.value)} placeholder={t('age_player')} />

        {/* Lista desplegable para la posición */}
        <select value={playerPosition} onChange={(e) => setPlayerPosition(e.target.value)}>
          <option value="">{t('select_position')}</option>
          <option value="Portero">{t('goalkepeer')}</option>
          <option value="Defensa">{t('defender')}</option>
          <option value="Centrocampista">{t('midfielder')}</option>
          <option value="Delantero">{t('striker')}</option>
        </select>

        {/* Lista desplegable para el equipo */}
        <select value={playerTeam} onChange={(e) => setPlayerTeam(e.target.value)}>
          <option value="">{t('select_team')}</option>
          {teams.map((team, index) => (
            <option key={index} value={team.name}>{team.name}</option>
          ))}
        </select>

        <input type="file" onChange={(e) => setPlayerPhoto(e.target.files[0])} />
        <button type="submit">{t('add_player')}</button>
      </form>


      {/* Tabla de jugadores */}
      <h1 className="list-equipos">{t('players')}</h1>
      <table>
        <thead>
          <tr>
            <th>{t('photo')}</th>
            <th>{t('name')}</th>
            <th>{t('age')}</th>
            <th>{t('position')}</th>
            <th>{t('team')}</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td><img src={player.photo} alt={player.name} style={{ width: 50, height: 50, borderRadius: '50%' }} /></td>
              <td>{player.name}</td>
              <td>{player.age}</td>
              <td>{player.position}</td>
              <td>{player.team}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Búsqueda */}
      <h1 className='busqueda'>{t('search')}</h1>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('search_player')} />
      <button onClick={handleSearch}>{t('search')}</button>
    </main>
  );
};

export default Main;
