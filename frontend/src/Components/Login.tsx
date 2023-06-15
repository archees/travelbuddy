import LoginButton from "./LoginButton.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, Text, VStack } from '@chakra-ui/react';
export function Login() {
    const {isAuthenticated} = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/TravelPlans');
        }
    }, [isAuthenticated, navigate]);
    return (
        <VStack
            justify="center"
            align="center"
            spacing={6}
        >
            <Text color="white" fontSize="xl" fontWeight="bold">
                Welcome to Travel Buddy!
            </Text>
            <Box>
                <Text color="white">Log in to explore and connect with fellow travelers.</Text>
            </Box>
            <LoginButton text="Log In" />
        </VStack>
    );
}


