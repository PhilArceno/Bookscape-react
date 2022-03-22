import React, { useState, useEffect } from 'react';
import { Box, Heading, Image, Stack, Text, Link, Button } from '@chakra-ui/react';
import { BiLinkExternal } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [bookDetails, setBookDetails] = useState({
    title: '',
    subject: '',
    authors: [],
    publishedDate: '',
    publisher: '',
    isbn: [],
    // dewey: -1,
    coverImage: '',
    description: ``,
    previewLink: '',
  });

  const getBookDetails = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`, {
        method: 'GET',
      })
        .then(response => response.text())
        .then(text => {
          let { volumeInfo } = JSON.parse(text);
          console.log(volumeInfo);
          setBookDetails({
            title: volumeInfo.title,
            authors: volumeInfo.authors,
            description: volumeInfo.description,
            publisher: volumeInfo.publisher,
            categories: volumeInfo.categories,
            publishedDate: volumeInfo.publishedDate,
            previewLink: volumeInfo.previewLink,
            isbn: volumeInfo.industryIdentifiers,
            coverImage: volumeInfo.imageLinks.large,
            pageCount: volumeInfo.pageCount,
          });
        });
  }

  useEffect(() => {
    getBookDetails();
  }, []);

  const addToLibrary = () => {
    // public decimal Dewey { get; set; } = 0;

    // public int TotalCopies { get; set; } = 0;

    // public int CopiesLoaned { get; set; } = 0;

      setIsLoading(true);
      fetch(`https://localhost:7098/api/Books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: bookDetails.title,
            author: bookDetails.authors[0],
            subject: bookDetails.categories[0],
            description: bookDetails.description,
            publisher: bookDetails.publisher,
            isbn: bookDetails.isbn[0].identifier,
            coverImage: bookDetails.coverImage,
        })
      })
        .then(response => response.text())
        .then(text => {
            setIsLoading(false);
            let parsed = JSON.parse(text);
            console.log(parsed);

        });
  }

  return (
    <Box>
      <Stack
        gap="10"
        flexDirection={{ sm: 'column', lg: 'row' }}
        alignItems={{ sm: 'center', lg: 'unset' }}
      >
        <Image
          src={bookDetails ? bookDetails.coverImage : ''}
          width="400px"
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
            {bookDetails.authors.map((author, idx) => {
              let authorName = author;
              if (idx < bookDetails.authors.length - 1) authorName += '';
              return <span key={idx}>{authorName}</span>;
            })}
          </Heading>
          <Heading as="h3" size="sm">
            {bookDetails.publisher}, {bookDetails.publishedDate}
          </Heading>
          {bookDetails.isbn.map(isbn => (
            <Heading as="h4" size="xs" key={isbn}>
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
          <Button isLoading={isLoading} colorScheme={"green"} onClick={()=> {addToLibrary()}}>
              Add to Library
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default BookDetails;
