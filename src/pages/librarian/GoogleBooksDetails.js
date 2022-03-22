import React from 'react'
import { BookDetails } from "../../components/"
import { Box } from '@chakra-ui/react'

function GoogleBooksDetails() {
  return (
    <Box m={10} maxW="1600" display="flex" justifyContent={"center"}>
        <BookDetails/>
    </Box>
  )
}

export default GoogleBooksDetails