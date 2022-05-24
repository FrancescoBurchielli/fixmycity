import {FC} from 'react'
import { useRoutes, BrowserRouter as Router } from 'react-router-dom' ;
import routes from './routes/routes';

const App: FC<{}> = () => { 
    const routeResult = useRoutes(routes);
    return routeResult    
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};


export default AppWrapper;
