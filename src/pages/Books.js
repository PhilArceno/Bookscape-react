import { Box, Heading, Image, Link, Text } from '@chakra-ui/react';
import {Link as ReactRouterLink} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import { config } from "../helpers/constants";
const Books = () => {
    const [booksList, setBooksList] = useState([])

    useEffect(() => {
      getBooks();
    }, [])

    const getBooks = () => {
        fetch(config.url.API_URL + "/api/Books", {
            method: "GET"
        }).then(response => response.text())
        .then(text => {
            let parsed = JSON.parse(text);
            setBooksList(parsed)
        })
    }

  return (
    <Box m={"2em auto"} w="950" maxW="950" display="flex" justifyContent={"center"}>
        <Box p={5} display="flex" flexWrap={"wrap"} width="fit-content" m="0 auto" gap="10" rounded={"lg"} shadow="md">
            {booksList.map((book, idx) => {
                return <Link key={book.id} to={`/Books/${book.id}`} as={ReactRouterLink} display="flex" flexDirection={"column"} gap={1}>
                <Box height={"230.859px"}>
                    <Image src={book.coverImage} maxW="150" w="150px"/>
                </Box>
                    <Text textAlign={"center"}>{book.title.substring(0, 17)}{book.title.length > 17 ? "..." : ""}</Text>
                </Link>
            })}
        </Box>
    </Box>
  )
}

export default Books