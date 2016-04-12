/**
 * main.js
 *
 */

import React from 'react';
import { render } from 'react-dom';
import routes from './routes'
import InitialiseActions from './actions/initialiseActions';

InitialiseActions.initApp();

render(routes, document.getElementById('app'));
