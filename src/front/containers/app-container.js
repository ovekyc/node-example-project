import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from '../routes';

class AppContainer extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default AppContainer;
