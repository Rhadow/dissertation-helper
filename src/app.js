// Styles
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/app.scss';

// React
import React from 'react';
import Router from 'react-router';

// Components
import Main from './components/container/main/main';
import NotFound from './components/container/not-found/not-found';
import Intro from './components/container/intro/intro';
import AuthorNameSorter from './components/container/author-name-sorter/author-name-sorter';

let {Route, DefaultRoute, NotFoundRoute} = Router,
    Routes;

Routes = (
    <Route path="/" handler={Main}>
        <Route path="intro" handler={Intro} />
        <Route path="name-sorter" handler={AuthorNameSorter} />
        <DefaultRoute handler={Intro} />
        <NotFoundRoute handler={NotFound} />
    </Route>
);

Router.run(Routes, (Handler, state) => {
    React.render(<Handler {...state} />, document.body);
});
