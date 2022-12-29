import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux'
import {store,persistor} from '../src/store/Store'
// import store from '../src/store/Store'
import {persistStore} from 'redux-persist'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter><Provider store={store}>
<PersistGate persistor={persistor}>
<App/>
 </PersistGate>   

</Provider></BrowserRouter>);
