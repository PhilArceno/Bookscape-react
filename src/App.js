import React, {useEffect, useState} from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import * as Pages from './pages/';
import { Footer, Navbar } from './components';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import * as LibrarianPages from './pages/librarian';
import * as AdminPages from './pages/admin';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    checkLoggedIn();
  }, [])
  
  const checkLoggedIn = () => {
    fetch("https://localhost:7098/api/Users/IsLoggedIn", {
      method: "GET",
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    }).then((response) => response.text())
      .then((text) => {
        let parsed = JSON.parse(text);
        if (parsed.success) {
          setIsLoggedIn(true);
          setRole(parsed.data);
        }
      })
  }

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar userStatus={{isLoggedIn, setIsLoggedIn}} />
        <Routes>
          <Route path="/" exact element={<Pages.Home/>} />
          <Route path="/home" exact element={<Pages.Home/>} />
          <Route path="/login"  exact element={<Pages.Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" exact element={<Pages.Signup />} />
          <Route path="/books" exact element={<Pages.Books />} />
          <Route path="/google-books-search" exact element={<Pages.GoogleBooksSearch />} />
          <Route path="/google-books/:id" exact element={<LibrarianPages.GoogleBooksDetails/>} />
          {role == "admin" ? (
            <>
          <Route exact path='/admin/user/list' element={<AdminPages.UserList/>}/>
          <Route exact path="/admin/user/:id" element={<AdminPages.UserDetail/>}/>
          <Route exact path="/admin/user/add" element={<AdminPages.UserAdd/>}/>
          <Route exact path="/admin/user/edit/:id" element={<AdminPages.UserEdit/>}/>
          <Route exact path='/admin/book/list' element={<AdminPages.BookList/>}/>
          <Route exact path="/admin/book/:id" element={<AdminPages.BookDetail/>}/>
          <Route exact path="/admin/book/add" element={<AdminPages.BookAdd/>}/>
          <Route exact path="/admin/book/edit/:id" element={<AdminPages.BookEdit/>}/>
          </>
          ) : ""}
          <Route path="*" exact element={<Pages.PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
