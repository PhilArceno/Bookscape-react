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

const BookDetails = ({ book, action }) => {

  return (
    <Box>
      <Stack
        gap="10"
        flexDirection={{ sm: 'column', lg: 'row' }}
        alignItems={{ sm: 'center', lg: 'unset' }}
      >
        <Image
          src={book ? book.coverImage : ''}
          minWidth="400px"
          alt="Book-cover"
          whilehover="hover"
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
            {book.title}
          </Heading>
          <Heading as="h2" size="md">
            {book.subject}
          </Heading>
          <Heading as="h3" size="sm">
            {book.author}
          </Heading>
          <Heading as="h3" size="sm">
            {book.publisher}, {book.publishedDate}
          </Heading>
            <Heading as="h4" size="xs" key={book.isbn}>
              ISBN-13 - {book.isbn}
            </Heading>
          <Heading as="h4" size="xs">
            {book.dewey}
          </Heading>
          <Text>{book.description}</Text>
          <Link href={book.previewLink} isExternal>
            {' '}
            More Details{' '}
            <BiLinkExternal style={{ display: 'inline' }}></BiLinkExternal>{' '}
          </Link>
            {action}
        </Box>
      </Stack>
    </Box>
  );
};

export default BookDetails;
