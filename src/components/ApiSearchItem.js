import { BiLinkExternal } from 'react-icons/bi';
import {useState, useContext, useEffect} from "react";
import defaultBook from '../images/nocoverimage.png';
import { motion } from 'framer-motion';
import { Box, Heading, Flex, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import { Link as ReactRouterLink} from 'react-router-dom';
import { AuthContext } from '../helpers/contexts';

const ApiSearchItem = ({ id, volumeInfo }) => {
  const { authState } = useContext(AuthContext);
  const [link, setLink] = useState("/book-request");
  useEffect(() => {
    if (authState.role == "librarian" || authState.role == "admin") {
      setLink("/google-books")
    }
  }, [])
  

  const imageVariants = {
    hover: {
      scale: 1.7,
      boxShadow: '0px 0px 8px #000',
      transition: {
        duration: 0.5,
        type: 'spring',
        delay: 0.15,
      },
    },
  };
  let { title, authors, publisher, previewLink, imageLinks, description } =
    volumeInfo;

  //setting up default values for volume info data
  title = title || 'Title is not available';
  authors = authors || 'Author(s) name not available';
  publisher = publisher || 'Publisher company not available';
  previewLink = previewLink || 'https://books.google.co.in/';

  return (
    <Link as={ReactRouterLink} to={`${link}/${id}`} textDecoration="unset">
      <Box key={id} p="5" borderWidth="1px" borderRadius="lg" shadow={'lg'}>
        <Flex flexDirection={{ sm: 'column', md: 'row' }} gap="5">
          <Box>
            <motion.img
              src={imageLinks ? imageLinks.thumbnail : defaultBook}
              width="125px"
              alt="Book-cover"
              variants={imageVariants}
              whilehover="hover"
            />
          </Box>
          <Box>
            <Box>
              {title && (
                <Heading data-testid="title" marginBottom={'.3em'} size="md" className="inline">
                  {title}
                </Heading>
              )}
            </Box>
            {/* Authors */}
            <Box>
              {authors && (
                <Heading
                  marginBottom={'.3em'}
                  as="h4"
                  size="sm"
                  fontWeight={'medium'}
                >
                  {' '}
                  Author:{' '}
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: '#3B3B3B',
                    }}
                  >
                    {' '}
                    {authors}{' '}
                  </span>
                </Heading>
              )}
            </Box>
            {/* Publisher */}
            <Box>
              {publisher && (
                <Heading
                  marginBottom={'.3em'}
                  as={'h4'}
                  size="sm"
                  fontWeight={'medium'}
                >
                  {' '}
                  Published by:{' '}
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: '#3B3B3B',
                    }}
                  >
                    {' '}
                    {publisher}{' '}
                  </span>
                </Heading>
              )}
            </Box>
            {/* Description */}
            <Box>
              {description && <Text>{description.substr(0, 150)}...</Text>}
            </Box>
            {/* Google books link */}
            <Box>
              {previewLink && (
                <h5
                  style={{
                    fontWeight: 'bold',
                    paddingBottom: '1rem',
                  }}
                >
                  Read more :{' '}
                  <Link href={previewLink} isExternal>
                    {' '}
                    Google Books{' '}
                    <BiLinkExternal
                      style={{ display: 'inline' }}
                    ></BiLinkExternal>{' '}
                  </Link>
                </h5>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Link>
  );
};

export default ApiSearchItem;
