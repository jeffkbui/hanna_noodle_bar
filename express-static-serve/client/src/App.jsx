import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { ROUTES } from './constants/Routes';
import './app.scss';
import MarketingTeaser from './components/marketingTeaser/MarketingTeaser';
import { EasybaseProvider } from 'easybase-react';
import ebconfig from './ebconfig';
import Admin from './components/admin/Admin';

export const App = ({}) => {
    const dimensions = { width: window.innerWidth, height: window.innerHeight };
    const isMobile = dimensions.width <= 450;
    return (
        <div className='app'>
            <EasybaseProvider ebconfig={ebconfig}>
                <div className='app-background-image' />
                <div className='background-image-blur' />
                <div className='app-main-container'>
                    <BrowserRouter>
                        <Switch>
                            <Route key="admin" exact path={ROUTES.ADMIN} component={Admin} />
                            <Route key="landing" exact path={ROUTES.LANDING} render={() => <MarketingTeaser isMobile={isMobile}/>} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </EasybaseProvider>
        </div>
    );
};

export default App;