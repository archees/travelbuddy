import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Homeimg from '../assets/images/Homeimg.gif';
import LoginButton from './LoginButton.tsx';

export default function Home() {
    const navigate = useNavigate();
    const onSubmitLogin = () => {
        navigate('/login');
    };

    return (
        <Stack
            minH={'100vh'}
            direction={{ base: 'column', md: 'row' }}
            bg="teal.400"
            color="white"
            padding={8}
        >
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <br />{' '}
                        <Text color={'blue.400'} as={'span'}>
                            Travel Buddy
                        </Text>{' '}
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                        Find people to travel with!
                    </Text>
                    <Button
                        rounded={'full'}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        onClick={onSubmitLogin}
                    >
                        Explore
                    </Button>
                </Stack>
            </Flex>
            <Flex flex={1} align={'center'} justify={'center'}>
                <Image alt={'Home Image'} objectFit={'contain'} maxH={'70vh'} src={Homeimg} />
                <p style={{ color: 'gray', fontSize: '12px' }}>Image from Lottie files</p>
            </Flex>
        </Stack>
    );
}
