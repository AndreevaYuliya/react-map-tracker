import React from 'react';

import { observer } from 'mobx-react-lite';

import authStore from './stores/AuthStore';

import Auth from './components/Auth';
import MapView from './components/MapView';

const App = observer(() => {
  const key = authStore.key

  return key ? <MapView /> : <Auth />;
});

export default App;
