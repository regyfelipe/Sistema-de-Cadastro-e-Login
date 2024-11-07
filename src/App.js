import './App.css';
import './index.css';
import AppRouter from './router/Router'; 
import { NotificationContainer } from 'react-notifications'; 
import 'react-notifications/lib/notifications.css';
import { ThemeProvider } from '@material-tailwind/react';

function App() {
  return (
    <ThemeProvider> 
      <AppRouter />
      <NotificationContainer />
    </ThemeProvider>
  );
}

export default App;
