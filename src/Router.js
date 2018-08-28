import React, { Component } from 'react';
import './index.css'
import TopStories from './TopStories'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={TopStories} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;