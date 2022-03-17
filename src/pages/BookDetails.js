import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchAPIBook, LoadingBook, LoadingCard } from '../components';
import { Heading, Flex, Box } from '@chakra-ui/react';

const BookDetails = () => {
  const [details, setDetails] = useState([]);

  const [term, setTerm] = useState('Elmo');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const resources = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=11`
      );
      setDetails(resources.data.items);
      setIsLoading(false);
    };
    fetchDetails();
  }, [term]);

  const loadMore = async () => {
    const resources = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=8&startIndex=${details.length}`
    );
    setDetails(oldDetails => [...oldDetails, ...resources.data.items]);
  };

  return (
    <Box maxW="4xl" p="0 10px" m="1.5em auto">
      <SearchAPIBook searchText={text => setTerm(text)}></SearchAPIBook>
      <Heading textTransform={'capitalize'} color={'#DB4437'} size="xl">
        Results for '{term}'
      </Heading>
      {isLoading ? (
        <section className="container" style={{ padding: '2rem 0rem' }}>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      ) : !details ? (
        <h1
          className="loading-name"
          style={{
            background: 'white',
            borderRadius: '1rem',
            color: '#DB4437',
            padding: '1rem',
            position: 'absolute',
            top: '50%',
            left: '50%',
            fontSize: 33,
            fontFamily: 'Inria Serif',
            transform: 'translate(-50%,-50%)',
            textTransform: 'capitalize',
          }}
        >
          😞 Couldn't find books about {term}
        </h1>
      ) : (
        <Box maxW="4xl" m="0 auto">
          <Box
            className="container"
            style={{ padding: '2rem 0rem' }}
          >
            <Box display={{ sm: 'flex' }} flexDirection="column" gap="5">
              {details.map((book, index) => (
                <LoadingBook {...book} key={index} />
              ))}
            </Box>
            <div className="custom-card">
              <h3 style={{ fontSize: '1.32rem'}}>
                Didn't find the book you love?
              </h3>
              <br />
            </div>
          </Box>
          <div className="load-more">
            <button onClick={() => loadMore()}>Load More</button>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default BookDetails;
