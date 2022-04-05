import React, { useState, useEffect } from 'react';
import { BookDetails } from '../../components/';
import { Box, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { config } from '../../helpers/constants';

function GoogleBooksDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [existsInDb, setExistsInDb] = useState(false);
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
        let coverImage;
        if (imgs.large) coverImage = imgs.large;
        else if (imgs.medium) coverImage = imgs.medium;
        else if (imgs.small) coverImage = imgs.small;
        else if (imgs.thumbnail) coverImage = imgs.thumbnail;
        else if (imgs.smallThumbnail) coverImage = imgs.smallThumbnail;

        console.log(volumeInfo);
        setBookDetails({
          title: volumeInfo.title,
          author: volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown',
          description: volumeInfo.description,
          publisher: volumeInfo.publisher,
          subject: volumeInfo.categories ? volumeInfo.categories[0] : "Other",
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
          setExistsInDb(true);
        }
      });
  };

  useEffect(() => {
    async function fetchData() {
      checkBookInDb(await getBookDetails());
    }
    fetchData();
  }, []);

  const addToLibrary = () => {
    if (existsInDb) return;
    setIsLoading(true);
    fetch(config.url.API_URL + `/api/Books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      },
      body: JSON.stringify({
        title: bookDetails.title,
        author: bookDetails.author,
        subject: bookDetails.subject,
        description: bookDetails.description,
        publisher: bookDetails.publisher,
        isbn: bookDetails.isbn,
        coverImage: bookDetails.coverImage,
      }),
    })
      .then(response => response.text())
      .then(text => {
        setIsLoading(false);
        let parsed = JSON.parse(text);
        console.log(parsed);
        setExistsInDb(true);
      });
  };

  const formAction = existsInDb ? (
    <Button colorScheme={'gray'}>Already in Library</Button>
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
  );

  return (
    <Box m={10} maxW="1600" display="flex" justifyContent={'center'}>
      <BookDetails book={bookDetails} action={formAction} />
    </Box>
  );
}

export default GoogleBooksDetails;
