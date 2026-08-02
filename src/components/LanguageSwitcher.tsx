import React from 'react';
import { LanguageSelector } from './common/LanguageSelector';

export interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isMobile }) => {
  return <LanguageSelector isMobile={isMobile} />;
};

export default LanguageSwitcher;
