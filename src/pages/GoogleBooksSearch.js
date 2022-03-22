import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchAPIBook, ApiSearchItem, LoadingCard } from '../components';
import {
  Heading,
  Flex,
  Box,
  Button,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';

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
      console.log(resources.data);
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

  const renderBook = () => {
    return (
      <Box maxW="4xl" m="0 auto">
        <Box className="container" style={{ padding: '2rem 0rem' }}>
          <Box display={{ sm: 'flex' }} flexDirection="column" gap="5">
            {details.map((book, index) => (
              <ApiSearchItem {...book} key={book.id} />
            ))}
          </Box>
        </Box>
      </Box>
    );
  };

  const renderSkeleton = () => {
    const item = (
      <Box p="5" borderWidth="1px" borderRadius="lg" shadow={'lg'}>
        <Flex flexDirection={{ sm: 'column', md: 'row' }} gap="5">
          <Skeleton height="150" w={'100%'} maxW={125} />
          <Box w={'100%'}>
            <Skeleton
              height="30px"
              w={'100%'}
              maxW="400px"
              marginBottom={'10px'}
            />
            <SkeletonText noOfLines={4} spacing="4" w={'100%'} maxW="300px" />
          </Box>
        </Flex>
      </Box>
    );
    return (
      <Box maxW="4xl" m="0 auto">
        <Box className="container" style={{ padding: '2rem 0rem' }}>
          <Box display={{ sm: 'flex' }} flexDirection="column" gap="5"></Box>
          {item}
          {item}
          {item}
          {item}
        </Box>
      </Box>
    );
  };

  return (
    <Box maxW="4xl" p="0 10px" m="1.5em auto">
      <SearchAPIBook searchText={text => setTerm(text)}></SearchAPIBook>
      <Heading textTransform={'capitalize'} color={'#DB4437'} size="xl">
        Results for '{term}'
      </Heading>
      {isLoading ? (
        renderSkeleton()
      ) : !details ? (
        <Heading>😞 Couldn't find books about {term}</Heading>
      ) : (
        <>
          {renderBook()}
          <Box>
            <Heading m="1em auto">Didn't find the book you love?</Heading>
          </Box>
          <Box>
            <Button onClick={() => loadMore()}>Load More</Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BookDetails;
