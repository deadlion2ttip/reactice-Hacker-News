import React, { Component, Fragment } from 'react';
import './index.css'
import TopStories from './TopStories'
import NewStories from './NewStories'
import CommentsPage from './CommentsPage'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
      <Fragment>
      <div className='story-cards' id='banner'>
        Totally not Hacker News...
        <Link to='/newstories'>New Stories</Link>
        <Link to='/topstories'>Top Stories</Link>
      </div>
        <Switch>        
          <Route exact path='/newstories' component={NewStories} />
          <Route exact path='/comments/:storyid' component={CommentsPage} />
          <Route path='/' component={TopStories} />
        </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default Router;