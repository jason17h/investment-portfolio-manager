import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import FeeProvider from './components/FeeProvider';
import SuitabilityProvider from './suitability_components/SuitabilityProvider';

import './style/style.scss';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Container id="nav">
                <Nav variant="tabs" defaultActiveKey="/">
                    <Nav.Item>
                        <Nav.Link href="/">
                            <Link to="/">Fee Calculator</Link>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">
                            <Link to="/suitability">Suitability Calculator</Link>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
            <Switch>
                <Route path="/" component={FeeProvider} exact={true} />
                <Route path="/suitability" component={SuitabilityProvider} />
            </Switch>
        </div>
    </BrowserRouter>
)

const jsx = (
    <AppRouter />
)

// const jsx = (
//     <div>
//         <Provider store={store}>
//             <PortfolioFeeCalculator />
//         </Provider>
//         <Provider store={suitabilityStore}>
//             <SuitabilityCalculator />
//         </Provider>
//     </div>
// )


ReactDOM.render(jsx, document.getElementById('app'))