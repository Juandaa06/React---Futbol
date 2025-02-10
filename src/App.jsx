import React, { useState, useEffect } from "react";
import i18next from "i18next";
import translations from "./translations";

const App = () => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedLang, setSelectedLang] = useState(localStorage.getItem("selectedLang") || "es");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        i18next.init({
            lng: selectedLang,
            resources: translations,
        }, () => {
            updateContent();
        });
    }, [selectedLang]);

    const updateContent = () => {
        loadPositions();
        updateTeamSelect();
    };

    const updateTeamSelect = () => {
        return teams.map((team) => (
            <option key={team.name} value={team.name}>{team.name}</option>
        ));
    };

    const loadPositions = () => {
        return i18next.t("positions", { returnObjects: true }).map((position) => (
            <option key={position} value={position}>{position}</option>
        ));
    };

    const handleLanguageChange = (e) => {
        const lang = e.target.value;
        setSelectedLang(lang);
        i18next.changeLanguage(lang, updateContent);
        localStorage.setItem("selectedLang", lang);
    };

    const handleAddTeam = (e) => {
        e.preventDefault();
        const name = e.target.teamName.value.trim();
        const logoFile = e.target.teamLogo.files[0];
        const logo = logoFile ? URL.createObjectURL(logoFile) : "assets/images/default-team.jpg";

        if (!name) {
            alert(i18next.t("error_team_name"));
            return;
        }

        setTeams([...teams, { name, logo }]);
    };

    const handleAddPlayer = (e) => {
        e.preventDefault();
        const name = e.target.playerName.value.trim();
        const age = e.target.playerAge.value;
        const position = e.target.playerPosition.value;
        const team = e.target.playerTeam.value;
        const photoFile = e.target.playerPhoto.files[0];
        const photo = photoFile ? URL.createObjectURL(photoFile) : "assets/images/default-player.jpg";

        if (!name || !age || !position || !team) {
            alert(i18next.t("error_player_data"));
            return;
        }

        setPlayers([...players, { name, age, position, team, photo }]);
    };

    const updatePlayerTable = () => {
        return players.map((player, index) => (
            <tr key={index}>
                <td><img src={player.photo} alt={player.name} style={{ width: "50px", height: "50px", borderRadius: "50%" }} /></td>
                <td>{player.name}</td>
                <td>{player.age}</td>
                <td>{player.position}</td>
                <td>{player.team}</td>
            </tr>
        ));
    };

    const handleSearch = () => {
        if (searchQuery !== "") {
            alert(i18next.t("searching_for") + ": " + searchQuery);
        } else {
            alert(i18next.t("error_search"));
        }
    };

    return (
        <div>
            <select id="languageSwitcher" onChange={handleLanguageChange} value={selectedLang}>
                <option value="es">Español</option>
                <option value="en">English</option>
            </select>
            
            <form id="addTeamForm" onSubmit={handleAddTeam}>
                <input type="text" id="teamName" name="teamName" placeholder="Team Name" />
                <input type="file" id="teamLogo" name="teamLogo" />
                <button type="submit">Add Team</button>
            </form>
            
            <form id="addPlayerForm" onSubmit={handleAddPlayer}>
                <input type="text" id="playerName" name="playerName" placeholder="Player Name" />
                <input type="number" id="playerAge" name="playerAge" placeholder="Age" />
                <select id="playerPosition" name="playerPosition">{loadPositions()}</select>
                <select id="playerTeam" name="playerTeam">{updateTeamSelect()}</select>
                <input type="file" id="playerPhoto" name="playerPhoto" />
                <button type="submit">Add Player</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Position</th>
                        <th>Team</th>
                    </tr>
                </thead>
                <tbody>
                    {updatePlayerTable()}
                </tbody>
            </table>

            <input type="text" id="searchInput" onChange={(e) => setSearchQuery(e.target.value)} />
            <button id="searchButton" onClick={handleSearch}>Search</button>
        </div>
    );
};

export default App;
