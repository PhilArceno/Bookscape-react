const prod = {
    url: {
     API_URL:'https://bookscapeapi20220328211108.azurewebsites.net'
    }
   };
   
   const dev = {
    url: {
     API_URL: "https://localhost:7098"
    }
   };

   export const config = process.env.NODE_ENV === 'development' ? dev : prod;