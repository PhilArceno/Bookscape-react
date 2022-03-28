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

const SearchAPIBook = ({ searchText }) => {
  const [text, setText] = useState('');
  const [showValidTextModal, setShowValidTextModal] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (text === '' || !text.trim()) {
      setShowValidTextModal(true);
      return;
    }
    searchText(text);
  };

  const onChangevalue = e => {
    e.preventDefault();
    setText(e.target.value);
    searchText(e.target.value);
    if (e.target.value === '') {
      setText('Elmo');
      searchText('Elmo');
    }
  };

  return (
    <Box>
      <FormControl onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search Spiderman, Batman etc.."
            onChange={onChangevalue}
          />
          <InputRightElement children={<Button h={"80%"} w={"80%"} marginRight="10px" type="submit"><SearchIcon/></Button>} />
        </InputGroup>
      </FormControl>
      <Box
        id="popup1"
        className={showValidTextModal ? 'overlay modal-active' : 'overlay'}
      >
        <Box className="popup">
          <Box className="close" onClick={() => setShowValidTextModal(false)}>
            &times;
          </Box>
          <Heading className="content">Please Enter the valid text</Heading>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchAPIBook;
