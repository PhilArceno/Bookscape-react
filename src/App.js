import React, {useEffect, useState} from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import * as Pages from './pages/';
import { Footer, Navbar } from './components';
import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate} from 'react-router-dom';
import * as LibrarianPages from './pages/librarian';
import * as AdminPages from './pages/admin';
import AdminDashboard from './pages/admin/AdminDashboard';
import { config } from './helpers/constants';
import { AuthContext } from "./helpers/contexts/AuthContext";

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

  const adminRoutes = () => {
    if (authState.role == "admin") 
      return <>
          <Route exact path='/admin/dashboard' element ={<AdminDashboard/>}/>
          <Route exact path='/admin/user/list' element={<AdminPages.UserList/>}/>
          <Route exact path="/admin/user/:id" element={<AdminPages.UserDetail/>}/>
          <Route exact path="/admin/user/add" element={<AdminPages.UserAdd/>}/>
          <Route exact path="/admin/user/edit/:id" element={<AdminPages.UserEdit/>}/>
          <Route exact path='/admin/book/list' element={<AdminPages.BookList/>}/>
          <Route exact path="/admin/book/:id" element={<AdminPages.BookDetail/>}/>
          <Route exact path="/admin/book/add" element={<AdminPages.BookAdd/>}/>
          <Route exact path="/admin/book/edit/:id" element={<AdminPages.BookEdit/>}/>
          <Route exact path="/admin/loan/list" element={<AdminPages.LoanList/>}/>
          <Route exact path="/admin/loan/:id" element={<AdminPages.LoanDetail/>}/>
          <Route exact path="/admin/loan/add" element={<AdminPages.LoanAdd/>}/>
          <Route exact path="/admin/loan/edit/:id" element={<AdminPages.LoanEdit/>}/>
          <Route exact path="/admin/loan/return/:id" element={<AdminPages.LoanReturn/>}/>
      </>
  }

  const librarianRoutes = () => {
    if (authState.role == "admin" || authState.role == "librarian") return <>
      <Route path="/google-books-search" exact element={<LibrarianPages.GoogleBooksSearch />} />
      <Route path="/google-books/:id" exact element={<LibrarianPages.GoogleBooksDetails/>} />
      <Route path="/returns-scanner" exact element={<LibrarianPages.ReturnsScanner/>} />
      <Route path="/loans-scanner" exact element={<LibrarianPages.LoansScanner/>} />
      </>
  }

  return (
    <div className="App">
    <AuthContext.Provider
        value={{ authState, setAuthState }}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar userStatus={{isLoggedIn, setIsLoggedIn}} role={authState.role} />
        <Routes>
          <Route path="/home" exact element={<Pages.Home/>} />
          <Route path="/books" exact element={<Pages.Books />} />
          <Route path="/books/:id" exact element={<Pages.BookItem isLoggedIn={isLoggedIn}/>} />
        <Route element={<RequireAuth />}>
          <Route path="/" exact element={<Pages.Home/>} />
          <Route path='/myprofile' exact element ={<Pages.UserProfile isLoggedIn={isLoggedIn}/>}/>
          <Route path="/editprofile" exact element ={<Pages.UserProfileEdit/>}/>
          <Route path='/resetpassword' exact element ={<Pages.ResetPasswordForm/>}/>
          <Route path='/myrequests' exact element ={<Pages.RequestList/>}/>
          <Route path='/borrowedbooks' exact element ={<Pages.UserLoans/>}/>
        </Route>
        <Route path="/signup" exact element={<Pages.Signup />} />
        <Route path="/login"  exact element={<Pages.Login checkLoggedIn={checkLoggedIn} />} />  
          {librarianRoutes()}
          {adminRoutes()}
          <Route path="*" exact element={<Pages.PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
    </AuthContext.Provider>
    </div>
  );

  function RequireAuth() {
    let location = useLocation();

    if (!isLoggedIn) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/books" state={{ from: location }} />;
    }

    return <Outlet />;
  }

}

export default App;
