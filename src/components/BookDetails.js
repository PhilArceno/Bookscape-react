import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  Link,
  Button,
} from '@chakra-ui/react';
import { BiLinkExternal } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [existsInDb, setExistsInDb] = useState(false);
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

  const getBookDetails = async () => {
    let isbn;
    await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`, {
      method: 'GET',
    })
      .then(response => response.text())
      .then(text => {
        let { volumeInfo } = JSON.parse(text);
        let imgs = volumeInfo.imageLinks;
        let coverImage;
        if (imgs.large) coverImage = imgs.large;
        else if (imgs.medium) coverImage = imgs.medium;
        else if (imgs.small) coverImage = imgs.small;
        else if (imgs.thumbnail) coverImage = imgs.thumbnail;
        else if (imgs.smallThumbnail) coverImage = imgs.smallThumbnail;

        setBookDetails({
          title: volumeInfo.title,
          author: volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown',
          description: volumeInfo.description,
          publisher: volumeInfo.publisher,
          categories: volumeInfo.categories,
          publishedDate: volumeInfo.publishedDate,
          previewLink: volumeInfo.previewLink,
          isbn: volumeInfo.industryIdentifiers,
          coverImage,
          pageCount: volumeInfo.pageCount,
        });
        isbn = volumeInfo.industryIdentifiers[1].identifier;
      });
    return isbn;
  };

  const checkBookInDb = isbn => {
    console.log(isbn);
    fetch(`http://bookscapeapi2-dev.us-east-2.elasticbeanstalk.com/api/exists/${isbn}`, {
      method: 'GET',
    })
      .then(response => response.text())
      .then(text => {
        let parsed = JSON.parse(text);
        if (parsed) {
          setExistsInDb(true);
        }
      });
  };

  useEffect(async () => {
    checkBookInDb(await getBookDetails());
  }, []);
  
  useEffect(() => {
    
  
    return () => {
      
    }
  }, [existsInDb])
  

  const addToLibrary = () => {
    // public decimal Dewey { get; set; } = 0;

    // public int TotalCopies { get; set; } = 0;

    // public int CopiesLoaned { get; set; } = 0;

    if (!existsInDb) return
    setIsLoading(true);
    fetch(`http://bookscapeapi2-dev.us-east-2.elasticbeanstalk.com/api/Books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: bookDetails.title,
        author: bookDetails.author,
        subject: bookDetails.categories[0],
        description: bookDetails.description,
        publisher: bookDetails.publisher,
        isbn: bookDetails.isbn[1].identifier,
        coverImage: bookDetails.coverImage,
      }),
    })
      .then(response => response.text())
      .then(text => {
        setIsLoading(false);
        let parsed = JSON.parse(text);
        console.log(parsed);
      });
  };

  return (
    <Box>
      <Stack
        gap="10"
        flexDirection={{ sm: 'column', lg: 'row' }}
        alignItems={{ sm: 'center', lg: 'unset' }}
      >
        <Image
          src={bookDetails ? bookDetails.coverImage : ''}
          minWidth="400px"
          alt="Book-cover"
          whileHover="hover"
          rounded={'xl'}
        />
        <Box
          p="5"
          marginTop={'0!important'}
          display="flex"
          flexDirection={'column'}
          gap="2"
          rounded={'xl'}
          shadow="lg"
        >
          <Heading as="h1" size="2xl">
            {bookDetails.title}
          </Heading>
          <Heading as="h2" size="md">
            {bookDetails.subject}
          </Heading>
          <Heading as="h3" size="sm">
            {bookDetails.author}
          </Heading>
          <Heading as="h3" size="sm">
            {bookDetails.publisher}, {bookDetails.publishedDate}
          </Heading>
          {bookDetails.isbn.map(isbn => (
            <Heading as="h4" size="xs" key={isbn.identifier}>
              {isbn.type.replaceAll('_', '-')} - {isbn.identifier}
            </Heading>
          ))}
          <Heading as="h4" size="xs">
            {bookDetails.dewey}
          </Heading>
          <Text>{bookDetails.description}</Text>
          <Link href={bookDetails.previewLink} isExternal>
            {' '}
            More Details{' '}
            <BiLinkExternal style={{ display: 'inline' }}></BiLinkExternal>{' '}
          </Link>
          {!existsInDb ? (
            <Button colorScheme={'gray'}>
              Already in Library
            </Button>
          ) : (
            <Button
              isLoading={isLoading}
              colorScheme={'green'}
              onClick={() => {
                addToLibrary();
              }}
            >
              Add to Library
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default BookDetails;
