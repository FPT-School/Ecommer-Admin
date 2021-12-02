import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from 'routes';

import 'assets/boxicons-2.0.7/css/boxicons.min.css';
import 'assets/css/grid.css';
import 'assets/css/theme.css';
import 'assets/css/index.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, idx) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component || Fragment;
          return (
            <Route
              key={`route-${idx}`}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    <Component {...props} />
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
