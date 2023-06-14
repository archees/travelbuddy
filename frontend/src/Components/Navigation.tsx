import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
export function NavBar() {
    const { isAuthenticated } = useAuth0();

    return (
        <>
        <Flex as="nav"
        align="center"
        justify="space-between"
        padding="1rem"
        bg="teal.400"
        color="white"
    >
        <Box>
            <Link to="/" >Home</Link>
            {isAuthenticated ? (
                <>
                <Link to="/logout" >Logout</Link>
                <Link to="/travelplans">Travel Posts</Link>
                </>):(
                <Link to="/login">Login</Link>
            )}
        </Box>
    </Flex>
      </>
    );
}
