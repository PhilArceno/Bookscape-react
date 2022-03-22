import React, {useEffect} from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Home, PageNotFound, Login, Signup, GoogleBooksSearch, Books } from './pages/';
import { Footer, Navbar } from './components';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import  UserList from './pages/admin/UserList';
import  UserDetail from './pages/admin/UserDetail';
import  UserAdd from './pages/admin/UserAdd';
import  UserEdit from './pages/admin/UserEdit';
import { GoogleBooksDetails } from './pages/librarian';
import Index from './pages/admin/Index';

function App() {

  // useEffect(() => {
  //   fetch("https://localhost:7098/api/Books",
  //     {
  //       method: "GET",
  //       header: {
  //         'Access-Control-Allow-Origin':'http://localhost:3000/',
  //       }
  //     }
  //   ).then((response) => response.text())
  //   .then((text) => console.log(JSON.parse(text)))  
  //   return () => {
      
  //   }
  // }, [])
  

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/home" exact element={<Home/>} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/books" exact element={<Books />} />
          <Route path="/google-books-search" exact element={<GoogleBooksSearch />} />
          <Route path="/google-books/:id" exact element={<GoogleBooksDetails/>} />
          <Route exact path ="/admin/user/Index" element={<Index/>} />
          <Route exact path='/admin/user/list' element={<UserList/>}/>
          <Route exact path="/admin/user/:id" element={<UserDetail/>}/>
          <Route exact path="/admin/user/add" element={<UserAdd/>}/>
          <Route exact path="/admin/user/edit/:id" element={<UserEdit/>}/>
          <Route path="*" exact element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
