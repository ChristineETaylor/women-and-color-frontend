import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Grid from 'material-ui/Grid';

// App
import SideBar from './SideBar';
import About from './About/About';
import Account from './Account/Account';
import Talks from './Talks/Talks';
import css from './styles.css';

const subroutes = [
  {
    id: 0,
    path: 'about',
    text: 'about',
    component: About,
  },
  {
    id: 1,
    path: 'talks',
    text: 'talks',
    component: Talks,
  },
  {
    id: 2,
    path: 'account',
    text: 'account',
    component: Account,
  },
];

const _renderRoute = ({ component: Component, baseUrl, path, key }) => (
  <Route
    key={key}
    path={path}
    render={({ match }) => (
      <Grid container spacing={40}>
        <Grid item xs={12} md={3}>
          <SideBar
            baseUrl={baseUrl}
            activeSubroute={key}
            subroutes={subroutes}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Component />
        </Grid>
      </Grid>
    )}
  />
);

const EditProfile = ({ match }) => (
  <div className={css.editProfileContainer}>
    <Grid container justify="center">
      <Grid item xs={11} md={8}>
        <Switch>
          <Redirect
            exact
            from={match.path}
            to={`${match.path}/${subroutes[0].path}`}
          />
          {subroutes.map(subroute =>
            _renderRoute({
              key: subroute.id,
              component: subroute.component,
              baseUrl: match.url,
              path: `${match.path}/${subroute.path}`,
            })
          )}
        </Switch>
      </Grid>
    </Grid>
  </div>
);

export default EditProfile;
