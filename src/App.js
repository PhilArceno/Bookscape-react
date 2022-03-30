import React, {useEffect, useState} from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import * as Pages from './pages/';
import { Footer, Navbar } from './components';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import * as LibrarianPages from './pages/librarian';
import * as AdminPages from './pages/admin';
import * as Loans from './pages/loans';
import AdminDashboard from './pages/admin/AdminDashboard';
import { config } from './helpers/constants';
import { AuthContext } from "./helpers/AuthContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authState, setAuthState] = useState({
    id: "",
    role: ""
  });

  useEffect(() => {
    checkLoggedIn();
    return () => {
      checkLoggedIn();
    }
  }, [])

  
  const checkLoggedIn = () => {
    fetch(config.url.API_URL + "/api/Users/IsLoggedIn", {
      method: "GET",
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    }).then((response) => response.text())
      .then((text) => {
        let parsed = JSON.parse(text);
        console.log(parsed);
        if (parsed.success) {
          setIsLoggedIn(true);
          setAuthState({
            id: parsed.data.id,
            role: parsed.data.role
          });
        }
      })
  }

  return (
    <div className="App">
    <AuthContext.Provider
        value={{ authState, setAuthState }}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar userStatus={{isLoggedIn, setIsLoggedIn}} role={authState.role} />
        <Routes>
          <Route path="/" exact element={<Pages.Home/>} />
          <Route path="/home" exact element={<Pages.Home/>} />
          <Route path="/login"  exact element={<Pages.Login checkLoggedIn={checkLoggedIn} />} />
          <Route path="/signup" exact element={<Pages.Signup />} />
          <Route path="/books" exact element={<Pages.Books />} />
          <Route path="/books/:id" exact element={<Pages.BookItem isLoggedIn={isLoggedIn}/>} />
          <Route path='/myprofile' exact element ={<Pages.UserProfile isLoggedIn={isLoggedIn}/>}/>
          <Route path="/returns-scanner" exact element={<LibrarianPages.ReturnsScanner/>} />
          {authState.role == "admin" || "librarian" ? (
            <>
            <Route path="/google-books-search" exact element={<LibrarianPages.GoogleBooksSearch />} />
            <Route path="/google-books/:id" exact element={<LibrarianPages.GoogleBooksDetails/>} />
            </>
          ) : ""}
          {authState.role == "admin" ? (
            <>
          <Route exact path='/admin/dashboard' element ={<AdminDashboard/>}/>
          <Route exact path='/admin/user/list' element={<AdminPages.UserList/>}/>
          <Route exact path="/admin/user/:id" element={<AdminPages.UserDetail/>}/>
          <Route exact path="/admin/user/add" element={<AdminPages.UserAdd/>}/>
          <Route exact path="/admin/user/edit/:id" element={<AdminPages.UserEdit/>}/>
          <Route exact path='/admin/book/list' element={<AdminPages.BookList/>}/>
          <Route exact path="/admin/book/:id" element={<AdminPages.BookDetail/>}/>
          <Route exact path="/admin/book/add" element={<AdminPages.BookAdd/>}/>
          <Route exact path="/admin/book/edit/:id" element={<AdminPages.BookEdit/>}/>
          <Route exact path="/admin/request/list" element={<AdminPages.RequestList/>}/>
          </>
          ) : ""}
          <Route path="*" exact element={<Pages.PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
    </AuthContext.Provider>
    </div>
  );
}

export default App;
