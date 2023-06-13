import { Button, Center } from "@chakra-ui/react";
import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
export const TravelPlans = () => {
    const states = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District Of Columbia",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ];

    return (
        <Center h="50vh">
            <Box w="1/3" textAlign="center">
                <Menu>
                    <h1>Chose a place to view people travelling from that place</h1>
                    <Box >
                        <MenuButton
                            px={4}
                            py={2}
                            transition="all 0.2s"
                            borderRadius="md"
                            borderWidth="1px"
                            _hover={{ bg: "gray.400" }}
                            _expanded={{ bg: "blue.400" }}
                            _focus={{ boxShadow: "outline" }}
                        >
                            Select the state
                            <ChevronDownIcon />
                        </MenuButton>
                    </Box>
                    <Box>
                        <MenuList maxH="200px" overflowY="auto">
                            {states.map((item) => (
                                <MenuItem key={item}>{item}</MenuItem>
                            ))}
                        </MenuList>
                        <Button m={3}>Search</Button>
                    </Box>
                </Menu>
            </Box>
        </Center>
    );
};
