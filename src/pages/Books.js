import { Box, Heading, Image } from '@chakra-ui/react';
import React, {useState, useEffect} from 'react'

const Books = () => {
    const [booksList, setBooksList] = useState([])

    useEffect(() => {
      getBooks();
    }, [])

    const getBooks = () => {
        fetch("http://bookscapeapi2-dev.us-east-2.elasticbeanstalk.com/api/Books", {
            method: "GET"
        }).then(response => response.text())
        .then(text => {
            let parsed = JSON.parse(text);
            console.log(parsed);
            setBooksList(parsed)
        })
    }

  return (
    <Box m={10} maxW="1600" display="flex" justifyContent={"center"}>
        <Box p={5} display="flex" flexDirection={"column"} gap="10" rounded={"lg"} shadow="md">
            {booksList.map((book) => {
                return <Box display="flex" gap={10} alignItems="center" key={book.id}>
                    <Image src={book.coverImage} maxW="100"/>
                    <Heading>
                        {book.title}
                    </Heading>
                </Box>
            })}
        </Box>
    </Box>
  )
}

export default Books