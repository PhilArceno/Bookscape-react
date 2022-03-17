import React, {useEffect} from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Home, PageNotFound } from './pages/';
import { Footer, Navbar } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
