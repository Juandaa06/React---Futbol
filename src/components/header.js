import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

// 🔥 Importa las imágenes directamente
import logoEN from '../assets/images/usa.png';
import logoES from '../assets/images/colombia.png';
import logoFR from '../assets/images/france.png';
import logoDE from '../assets/images/alemania.png';

const Header = () => {
  const { t } = useTranslation();
  const currentLang = i18n.language || 'en';

  // 🔥 Asigna la imagen según el idioma seleccionado
  const logos = {
    en: logoEN,
    es: logoES,
    fr: logoFR,
    de: logoDE
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo-container">
          <img 
            id="image" 
            src={logos[currentLang] || logoEN} // 🔥 Cambia la imagen según el idioma
            alt="Logo"
            className="logo"
          />
          <h1>{t('league_title')}</h1>
        </div>
        <ul className="nav-links">
          <li><a href="#team-form">{t('add_team')}</a></li>
          <li><a href="#player-form">{t('add_player')}</a></li>
          <li><a href="#search-section">{t('search')}</a></li>
          <li><a href="#player-list">{t('players')}</a></li>
          <li><a href="#team-list">{t('teams')}</a></li>
        </ul>
        <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
      </nav>
    </header>
  );
};

export default Header;
