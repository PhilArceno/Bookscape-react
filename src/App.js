import React, {useEffect} from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Home, PageNotFound, Login, Signup, BookDetails } from './pages/';
import { Footer, Navbar } from './components';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import  UserList from './pages/admin/UserList';
import  UserDetail from './pages/admin/UserDetail';
import  UserAdd from './pages/admin/UserAdd';
import  UserEdit from './pages/admin/UserEdit';

function App() {

  useEffect(() => {
    fetch("https://localhost:7098/api/Books",
      {
        method: "GET",
        header: {
          'Access-Control-Allow-Origin':'http://localhost:3000/',
        }
      }
    ).then((response) => response.text())
    .then((text) => console.log(JSON.parse(text)))  
    return () => {
      
    }
  }, [])
  

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="*" exact element={<PageNotFound />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/BookDetails" exact element={<BookDetails />} />
          <Route exact path='/admin/user/list' element={<UserList/>}/>
          <Route exact path="/admin/user/:id" element={<UserDetail/>}/>
          <Route exact path="/admin/user/add" element={<UserAdd/>}/>
          <Route exact path="/admin/user/edit/:id" element={<UserEdit/>}/>
         
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
