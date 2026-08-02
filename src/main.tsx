import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/ThemeContext.tsx';
import { VideoLightboxProvider } from './components/common/VideoLightbox.tsx';
import { MediaProvider } from './media/MediaProvider.tsx';
import { AcademyProvider } from './context/AcademyContext.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AcademyProvider>
            <VideoLightboxProvider>
              <MediaProvider>
                <App />
              </MediaProvider>
            </VideoLightboxProvider>
          </AcademyProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);
