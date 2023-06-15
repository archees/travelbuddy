import { Button, Center } from "@chakra-ui/react";
import { Box, } from "@chakra-ui/react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";
import {TravelPlansService} from "@/Services/TravelPlansService.tsx";
import {
    FormControl,
    FormLabel,Select
} from '@chakra-ui/react';
import {useEffect, useState} from "react";
import { getUserId } from "@/Services/HttpClient.tsx";
export const TravelPlans = () => {
    const states = [
        "Alabama","Alaska","Arizona","Arkansas","California","Colorado",
        "Connecticut","Delaware","District Of Columbia","Florida",
        "Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas",
        "Kentucky","Louisiana","Maine","Maryland","Massachusetts",
        "Michigan","Minnesota","Mississippi","Missouri","Montana",
        "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
        "New York","North Carolina","North Dakota","Ohio","Oklahoma",
        "Oregon","Pennsylvania","Rhode Island","South Carolina",
        "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia",
        "Washington","West Virginia","Wisconsin","Wyoming"
    ];

    const [selectedState, setselectedState] = useState("");
    const [showAccordion, setShowAccordion] = useState(false);
    const [accordionItems, setAccordionItems] = useState([]);
    const [poster,setPoster]=useState("");
    const handleSearch = async () => {
        if (selectedState) {
            try {
                const response = await TravelPlansService.send(selectedState);
                const travelPlans = response.data;
                const items = travelPlans.map((plan) => {
                    useEffect(() => {
                        const fetchuserid = (poster) => {
                            getUserId(poster)
                                .then((response) => setPoster(response))
                                .catch((err) => console.log("Error in fetch poster_id", err));
                        }
                        fetchuserid(plan.poster_id);
                    }, []);

                    const title = `${poster} - From ${plan.FromlocationCity} ${plan.FromlocationState} to ${plan.Destination} -cost:($${plan.cost})`;
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
/*    useEffect(() => {
        const fetchData = async () => {
            await handleSearch();
        };
        fetchData();
    }, []);*/
    return (
        <Center h="50vh">
            <Box w="1/3" textAlign="center">
                <h1><strong>Choose a location to find travel posts:</strong></h1>
                <FormControl mt={6} isRequired>
                    <FormLabel>Enter a location:</FormLabel>
                    <Select placeholder='Select a state' value={selectedState} onChange={e => setselectedState(e.target.value)}>
                        {states.map((item) => (
                            <option key={item}>{item}</option>))}
                    </Select>
                </FormControl >
                <Button width="full" mt={4} type="submit" bg="blue.400" color="white" onClick={handleSearch}>
                    Search
                </Button>
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
                        <Button>Message</Button>
                    </Accordion>
                )}
            </Box>
        </Center>
    );
};


