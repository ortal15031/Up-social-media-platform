
import classes from './App.module.css';
import {Route} from 'react-router-dom'
import NavRouter from './Routes/NavRouter';
import Navigation from './components/navBar/Navigation'
import SearchPost from './components/search/Search'
import MainWrapper from './components/ui/mainWrapper/MainWrapper';
import {useHistory} from 'react-router-dom'
import PageWrapper from './components/ui/pageWrapper/PageWrapper';
function App() {
  const history=useHistory();
  const refreshHandler=(flag)=>{
  if(flag){
//  window.location.reload(false);
  history.go(0);
  }
  // window.stop();
  }
  return (
      <div className={classes.App}> 
    <header>
     <Navigation onRefresh={refreshHandler}/>
    </header>
    <main>
    <NavRouter/>
    </main>
   <footer>
   </footer>
    </div> 
  
  );
}

export default App;
