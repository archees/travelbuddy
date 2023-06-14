import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Box, Flex, Spacer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export function NavBar() {
    const { isAuthenticated } = useAuth0();

    return (
        <Flex
            as="nav"
            width="100vw"
            align="center"
            paddingX="1rem"
            bg="teal.400"
            color="white"
        >
            <Box>
                <Link to="/">Home</Link>
                {isAuthenticated &&  (
                    <>
                        <Link to="/logout">Logout</Link>
                        <Link to="/travelplans">Travel Posts</Link>
                    </>
                )}
            </Box>
            <Spacer />
            {isAuthenticated && (

                <Link to='/createtravelposts'><Button
                    variant="solid"
                    colorScheme="teal"
                    size="sm"
                    leftIcon={<AddIcon />}
                >
                    Create Travel Post
                </Button></Link>
            )}
        </Flex>
    );
}
