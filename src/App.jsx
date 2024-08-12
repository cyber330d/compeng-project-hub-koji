
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleProject from './pages/SingleProject';
import ShowRoom from './pages/ShowRoom'
import NewProject from './pages/NewProject'
import EditProject from './pages/EditProject'
import MyProject from './pages/MyProject';
import SinglePersonalProject from './pages/SinglePersonalProject'
import SavedProject from './pages/SavedProject';
import GroupPage from './pages/GroupPage';
import SingleGroup from './pages/SingleGroup';

import { UserProvider } from './context/UsersContext';
import MyProfile from './pages/MyProfile';

const App = () => {
  return (
    <UserProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/single-project/:id" element={<SingleProject />} />
          <Route path="/showroom" element={<ShowRoom />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/my-project" element={<MyProject />} />
          <Route path="/my-project/:id" element={<SinglePersonalProject />} />
         
          <Route path="/single-group/:id" element={<SingleGroup />} />
          
          <Route path="/saved" element={<SavedProject />} />
          <Route path="/groups" element={<GroupPage />} />

        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
};

export default App;
