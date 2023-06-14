import { Button, Center } from "@chakra-ui/react";
import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";
import {TravelPlansService} from "@/Services/TravelPlansService.tsx";
import {useEffect, useState} from "react";
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

    const [selectedState, setSelectedState] = useState("");
    const [showAccordion, setShowAccordion] = useState(false);
    const [accordionItems, setAccordionItems] = useState([]);

    const handleSearch = async () => {
        if (selectedState) {
            try {
                const response = await TravelPlansService.send(selectedState);
                const travelPlans = response.data;
                const items = travelPlans.map((plan) => {
                    const title = `${plan.poster.name} - From ${plan.FromlocationCity} to ${plan.Destination} ($${plan.cost})`;
                    const content = (
                        <div>
                            <p>From: {plan.FromlocationCity}, {plan.FromlocationState}</p>
                            <p>Start Date: {plan.startDate}</p>
                            <p>End Date: {plan.endDate}</p>
                            <p>Space Available: {plan.spaceAvailable}</p>
                            <p>Requirements: {plan.requirements}</p>
                        </div>
                    );
                    return { title, content };
                });
                setAccordionItems(items);
                setShowAccordion(true);
                console.log(accordionItems);
            } catch (error) {
                console.error("Error fetching travel plans:", error);
            }
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            await handleSearch();
        };
        fetchData();
    }, []);
    return (
        <Center h="50vh">
            <Box w="1/3" textAlign="center">
                <Menu>
                    <h1>Choose a place to view people travelling from that place</h1>
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
                                <MenuItem key={item} onClick={() => setSelectedState(item)}>{item}</MenuItem>
                            ))}
                        </MenuList>
                        <Button m={3} onClick={handleSearch}>Search</Button>
                    </Box>
                </Menu>
                {showAccordion && (
                    <Accordion allowMultiple>
                        {accordionItems.map((item, index) => (
                            <AccordionItem key={index}>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex="1" textAlign="left">
                                            {item.title}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>{item.content}</AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </Box>
        </Center>
    );
};


