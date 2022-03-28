import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';


const NavLink = ({ children }) => (
  <Link
    as={ReactRouterLink}
    to={`/${children.replaceAll(' ', '-')}`}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

export default function Navbar({ userStatus, role }) {
  //list of links will be implemented using a function
  const [Links, setLinks] = useState(['Home', 'Books'])
  const { isLoggedIn, setIsLoggedIn } = userStatus;
  //State used for hamburger icon (In mobile)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setLinks(["Home", "Books"])
    }
    else if ((role === "admin" || role === "librarian") && !Links.find(l => l === "Google Books Search")) {
        setLinks([...Links, "Google Books Search"])
    }
  }, [isLoggedIn])

  useEffect(() => {

  })
  

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {/* Hamburger icon, only shows in mobile (md: 'none') */}
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            {/* Logo goes here */}
            <Box fontWeight={600}>Bookscape</Box>
            {/* Each link will be mapped here in a horizontal stack */}
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {/* Sign in sign up buttons */}
            {!isLoggedIn ? (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}
              >
                <Link
                  as={ReactRouterLink}
                  to={'/login'}
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  <Button fontSize={'sm'} fontWeight={400}>
                    Sign In
                  </Button>
                </Link>
                <Link
                  as={ReactRouterLink}
                  display={{ base: 'none', md: 'inline-flex' }}
                  to={'/signup'}
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  <Button
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'pink.400'}
                    _hover={{
                      bg: 'pink.300',
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </Stack>
            ) : (
              ''
            )}
            {/* Color switcher */}
            <ColorModeSwitcher justifySelf="flex-end" />
            {/* Account icon (we should hide this when not logged in) */}
            {isLoggedIn ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem> <Link as={ReactRouterLink} to="/admin/dashboard">Admin</Link><br/></MenuItem>
                  <MenuDivider />
                  <MenuItem fontSize={'sm'} fontWeight={400} onClick={logout}>
                      Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              ''
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
