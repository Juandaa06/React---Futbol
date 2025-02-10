import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
        <p>&copy; 2025 <span data-i18n="footer">{t('ligue_team')}</span></p>
     </footer>
  );
};

export default Footer;
