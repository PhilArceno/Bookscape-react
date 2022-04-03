import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import { SearchIcon } from "@chakra-ui/icons"

const SearchAPIBook = ({ searchText, submitSearch }) => {
  const [text, setText] = useState('');
  const [showValidTextModal, setShowValidTextModal] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    // if (text === '' || !text.trim()) {
    //   setShowValidTextModal(true);
    //   return;
    // }
    searchText(text);
    if(submitSearch) submitSearch();
  };
  
  const onChangevalue = e => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <Box>
      <FormControl as={"form"} onSubmit={handleSubmit}>
        <InputGroup>
          <Input data-testid="searchInput"
            type="text"
            placeholder="Search Spiderman, Batman etc.."
            onChange={onChangevalue}
          />
          <InputRightElement zIndex={0} children={<Button id="searchbtn" h={"80%"} w={"80%"} marginRight="10px" type="submit"><SearchIcon/></Button>} />
        </InputGroup>
      </FormControl>
      {/* <Box
        id="popup1"
        className={showValidTextModal ? 'overlay modal-active' : 'overlay'}
      >
        <Box className="popup">
          <Box className="close" onClick={() => setShowValidTextModal(false)}>
            &times;
          </Box>
          <Heading className="content">Please Enter the valid text</Heading>
        </Box>
      </Box> */}
    </Box>
  );
};

export default SearchAPIBook;
