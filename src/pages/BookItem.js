import React, { useState, useEffect } from 'react';
import { BookDetails } from '../components/';
import { Box, Button, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { config } from '../helpers/constants';

function BookItem({ isLoggedIn }) {
  const { id } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [available, setAvailable] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [error, setError] = useState('');
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
    totalCopies: 0,
    copiesLoaned: 0,
  });

  const getBookDetails = () => {
    fetch(`${config.url.API_URL}/api/Books/${id}`, {
      method: 'GET',
    })
      .then(response => response.text())
      .then(text => {
        let book = JSON.parse(text);
        if (book.copiesLoaned < book.totalCopies) setAvailable(true);
        setBookDetails(book);
        setPageLoading(false);
      });
  };

  // const checkIsBookLoaned = () => {
  //   fetch(`${config.url.API_URL}/api/Loans/book/${id}/currentUser`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //     },
  //   })
  //     .then(response => response.text())
  //     .then(text => {
  //       setAvailable(JSON.parse(text).success);
  //     });
  // };

  useEffect(() => {
    async function fetchData() {
      await getBookDetails();
      // if (isLoggedIn) checkIsBookLoaned();
    }
    fetchData();
  }, []);

  const reserveBook = () => {
    setIsLoading(true);
    //ADD TO LOANS TABLE
    fetch(`${config.url.API_URL}/api/Loans/reserve/${bookDetails.isbn}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then(async response => {
        if (!response.ok) throw Error(await response.text());
        else return response.text();
      })
      .then(text => {
        console.log(text);
        // let parsed = JSON.parse(text);
        setReserved(true);
        setError("");
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        if (err.message == "You have already reserved this book") setReserved(true);
        setError(err.message);
        setIsLoading(false);
      });
  };

  const formAction = () => {
    if (!isLoggedIn) return <></>;
    if (reserved) return  <Button colorScheme={'gray'}>Already Reserved</Button>

    let jsx = available ? (
      <Button colorScheme={'gray'}>Available At Library</Button>
    ) : (
      <Button
        isLoading={isLoading}
        colorScheme={'green'}
        onClick={() => {
          reserveBook();
        }}
      >
        Reserve Book
      </Button>
    );

    if (error) {
      jsx = (
        <>
          <Text color="red">{error}</Text>
          {jsx}
        </>
      );
    }

    return jsx;
  };

  return (
    <Box m={10} maxW="1600" display="flex" justifyContent={'center'}>
      <BookDetails pageLoading={pageLoading} book={bookDetails} action={formAction()} />
    </Box>
  );
}

export default BookItem;
