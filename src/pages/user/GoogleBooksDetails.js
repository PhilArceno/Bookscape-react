import React, { useState, useEffect, useContext } from 'react';
import { BookDetails } from '../../components';
import {
  Flex,
  Box,
  FormLabel,
  FormControl,
  Button,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { config } from '../../helpers/constants';
import { AuthContext } from '../../helpers/contexts';

function GoogleBooksDetails() {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [exists, setExists] = useState(false);
  const [copies, setCopies] = useState(5);
  const handleChange = value => setCopies(value);
  const [bookDetails, setBookDetails] = useState({
    title: '',
    subject: '',
    author: '',
    publishedDate: '',
    publisher: '',
    isbn: '',
    // dewey: -1,
    coverImage: '',
    description: ``,
    previewLink: '',
  });

  const getBookDetails = async () => {
    let isbn;
    await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`, {
      method: 'GET',
    })
      .then(response => response.text())
      .then(text => {
        let { volumeInfo } = JSON.parse(text);
        let imgs = volumeInfo.imageLinks;
        let coverImage =
          imgs.large ??
          imgs.medium ??
          imgs.small ??
          imgs.thumbnail ??
          imgs.smallThumbnail;

        setBookDetails({
          title: volumeInfo.title,
          author: volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown',
          description: volumeInfo.description,
          publisher: volumeInfo.publisher,
          subject: volumeInfo.categories ? volumeInfo.categories[0] : 'Other',
          publishedDate: volumeInfo.publishedDate,
          previewLink: volumeInfo.previewLink,
          isbn: volumeInfo.industryIdentifiers[1].identifier,
          coverImage,
          pageCount: volumeInfo.pageCount,
        });
        isbn = volumeInfo.industryIdentifiers[1].identifier;
      });
    return isbn;
  };

  const checkBookInDb = isbn => {
    fetch(config.url.API_URL + `/exists/${isbn}`, {
      method: 'GET',
    })
      .then(response => response.text())
      .then(text => {
        let parsed = JSON.parse(text);
        if (parsed) {
          setExists(true);
        }
      });
  };

  const requestAcquireBook = isbn => {
    if (exists== true) return;
    setIsLoading(true);
    fetch(config.url.API_URL + `/api/Request/${isbn}`, {
      method: 'POST',
      body: JSON.stringify({
        title: bookDetails.title,
        author: bookDetails.author,
        subject: bookDetails.subject,
        description: bookDetails.description,
        publisher: bookDetails.publisher,
        isbn: bookDetails.isbn,
        coverImage: bookDetails.coverImage,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }
    })
      .then(response => response.text())
      .then(text => {
        setIsLoading(false);
        setExists(true);
      });

  }

  const checkAlreadyRequested = isbn => {
    fetch(config.url.API_URL + `/api/request/exists/${isbn}`, {
      method: 'GET',
    })
    .then(response => response.text())
    .then(requestExists => {
      setExists(JSON.parse(requestExists));
    });
  }

  useEffect(() => {
    async function fetchData() {
      let isbn = await getBookDetails();
      if (authState.role == 'admin' || authState.role == 'librarian') {
        checkBookInDb(isbn);
      } else {
        checkAlreadyRequested(isbn)
      }
    }
    fetchData();
  }, []);

  const addToLibrary = () => {
    if (exists) return;
    setIsLoading(true);
    fetch(config.url.API_URL + `/api/Books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        title: bookDetails.title,
        author: bookDetails.author,
        subject: bookDetails.subject,
        description: bookDetails.description,
        publisher: bookDetails.publisher,
        isbn: bookDetails.isbn,
        coverImage: bookDetails.coverImage,
        totalCopies: copies,
      }),
    })
      .then(response => response.text())
      .then(text => {
        setIsLoading(false);
        let parsed = JSON.parse(text);
        console.log(parsed);
        setExists(true);
      });
  };

  const formAction = () => {
    if (authState.role == 'admin' || authState.role == 'librarian') {
      return exists ? (
        <Button colorScheme={'gray'}>Already in Library</Button>
      ) : (
        <Box m="30px 0">
          <FormControl data-testid="username" id="username" isRequired>
            <FormLabel>Total Copies</FormLabel>
            <Flex>
              <NumberInput
                min={1}
                max={20}
                maxW="100px"
                mr="2rem"
                value={copies}
                onChange={handleChange}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                max={20}
                min={1}
                flex="1"
                maxW="300px"
                focusThumbOnChange={false}
                value={copies}
                onChange={handleChange}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize="sm" boxSize="32px" children={copies} />
              </Slider>
            </Flex>
          </FormControl>
          <Button
            mt={3}
            isLoading={isLoading}
            colorScheme={'green'}
            onClick={() => {
              addToLibrary();
            }}
          >
            Add to Library
          </Button>
        </Box>
      );
    } else if (authState.role == 'user') {
      return exists ? (<Button colorScheme={'gray'}>Already Requested</Button>)
      : (
        <Button 
        isLoading={isLoading}
        colorScheme={'green'}
        onClick={()=> {requestAcquireBook(bookDetails.isbn)}}
        >Request</Button>
      )
    }
  };

  return (
    <Box m={10} maxW="1600" display="flex" justifyContent={'center'}>
      <BookDetails book={bookDetails} action={formAction()} />
    </Box>
  );
}

export default GoogleBooksDetails;
