import {Route,Switch} from 'react-router-dom'
import SignUp from '../components/signUser/signup/SignUp';
import Login from '../components/signUser/login/Login'
import HomePage from '../components/HomePage';
import Profile from '../components/profile/Profile'
import ByCategory from '../components/searchResults/ByCategory/ByCategory';
import BlogForm from '../components/blogForm/BlogForm';
import MediumCard from '../components/ui/MediumCard/MediumCard';
import PostView from '../components/Post/postView/PostView';
import SearchByKeyword from '../components/searchResults/byKeyword/ByKeyword';
import SmallCard from '../components/ui/smallCard/SmallCard';
import CommentItem from '../components/comments/commentItem/CommentItem';
import DropDownList from '../components/ui/dropDown/dropDownList/DropDownList';
import AddComment from '../components/comments/addComment/AddComment';
const NavRouter=()=>{
    return(  
    <div>
    <Switch>
    <Route path='/' exact>
    <HomePage/>
    </Route>
    <Route path='/signup' exact>
    <SignUp/>
    </Route>
    <Route path='/login' exact>;
      <Login/>
    </Route>
    <Route path='/profile/:id' exact>
      <Profile/>
    </Route>
    <Route path='/search_by_category/:category' exact>
    <ByCategory/>
    </Route>
    <Route path='/create_post' exact>
     <BlogForm/>
    </Route>
    <Route path='/edit_post/:id' exact>
    <BlogForm/>      
    </Route>
    <Route path='/posts' exact>
    <MediumCard/>
    <SmallCard/>
    </Route>
    <Route path='/post_details/:id' exact>
    <PostView/>
    </Route>
    <Route path='/search_by_keyword'>
    <SearchByKeyword/>
    </Route>
    <Route path='pro' exact>
      <Profile/>
    </Route>
    <Route path='/comment' exact>
     <CommentItem/>
    </Route>
    <Route path='/list' exact>
<DropDownList/>
    </Route>
    <Route path='/add' exact>
<AddComment/>
    </Route>
    </Switch>
    </div>
    )
}

export default NavRouter;