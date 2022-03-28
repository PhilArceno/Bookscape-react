import React, { useState, useEffect } from 'react';
import { BookDetails } from '../components/';
import { Box, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { config } from '../helpers/constants';

function BookItem({isLoggedIn}) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loaned, setLoaned] = useState(false);
  const [bookDetails, setBookDetails] = useState({
    title: '',
    subject: '',
    author: '',
    publishedDate: '',
    publisher: '',
    isbn: [],
    // dewey: -1,
    coverImage: '',
    description: ``,
    previewLink: '',
  });

  const getBookDetails = () => {
    fetch(`${config.url.API_URL}/api/Books/${id}`, {
      method: 'GET',
    })
      .then(response => response.text())
      .then(text => {
        let book = JSON.parse(text);
        setBookDetails(book);
      });
  };

  const checkIsBookLoaned = () => {
    fetch(`${config.url.API_URL}/api/Loans/book/${id}/currentUser`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then(response => response.text())
      .then(text => {
        if (text) setLoaned(true);
      });
  };

  useEffect(() => {
    async function fetchData() {
      getBookDetails();
      if (isLoggedIn) checkIsBookLoaned();
    }
    fetchData();
  }, []);

  const borrowBook = () => {
    setIsLoading(true);
    //ADD TO LOANS TABLE
    fetch(`${config.url.API_URL}/api/Loans?bookId=${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then(response => response.text())
      .then(text => {
        let parsed = JSON.parse(text);
        console.log(parsed);
        if (parsed) setLoaned(true);
        setIsLoading(false);
      });
  };

  const formAction = isLoggedIn ? ( loaned ? (
    <Button colorScheme={'gray'}>Currently Borrowed</Button>
  ) : (
    <Button
      isLoading={isLoading}
      colorScheme={'green'}
      onClick={() => {
        borrowBook();
      }}
    >
      Borrow
    </Button>
  )) : <></>;

  return (
    <Box m={10} maxW="1600" display="flex" justifyContent={'center'}>
      <BookDetails book={bookDetails} action={formAction} />
    </Box>
  );
}

export default BookItem;
