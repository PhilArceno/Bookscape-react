const prod = {
    url: {
     API_URL:'http://bookscapeapi3-dev.us-east-2.elasticbeanstalk.com/'
    }
   };
   
   const dev = {
    url: {
     API_URL: "https://localhost:7098"
    }
   };

   export const config = process.env.NODE_ENV === 'development' ? dev : prod;