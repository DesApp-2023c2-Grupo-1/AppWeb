import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DatosUsuario from './components/DatosUsuario';
import Home from './components/Home';
import RecoilHome from './components-recoil/Home';
import RecoilDatosUsuario from './components-recoil/DatosUsuario';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '50px',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Router>
        <Switch>
          <Route path="/recoil/usuarios/:id">
            <RecoilDatosUsuario />
          </Route>
          <Route path="/recoil">
            <RecoilHome />
          </Route>
          <Route path="/usuarios/:id">
            <DatosUsuario />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}
