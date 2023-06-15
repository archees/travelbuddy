import { Button, Input, Box, Flex, Select } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInputField
} from '@chakra-ui/react';
import { httpClient, getUserId } from "@/Services/HttpClient.tsx";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {UserInfoContext} from "@/Services/Auth.tsx";
export enum SubmissionStatus {
    NotSubmitted,
    SubmitFailed,
    SubmitSucceeded
}
export const CreateTravelPosts = () => {
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
    // @ts-ignore
    const user = UserInfoContext();
    const name = user?.name;
    const [poster_id, setposter_id] = useState();
    const [FromlocationCity, setFromlocationCity] = useState("");
    const [FromlocationState, setFromlocationState] = useState("");
    const [Destination, setDestination] = useState("");
    const [startDate, setstartDate] = useState<Date | undefined>(undefined);
    const [endDate, setendDate] = useState<Date | undefined>(undefined);
    const [spaceAvailable, setspaceAvailable] = useState<number | undefined>(undefined);
    const [cost, setcost] = useState<number | undefined>(undefined);
    const [requirements, setrequirements] = useState("");
    const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchuserid = (poster) => {
            getUserId(poster)
                .then((response) => setposter_id(response))
                .catch((err) => console.log("Error in fetch poster_id", err));
        }
        fetchuserid(name);
    }, []);
    const onUploadFile = (ev) => {
        const formData = new FormData();

        formData.append("poster_id", poster_id);
        formData.append("FromlocationCity", FromlocationCity);
        formData.append("FromlocationState", FromlocationState);
        formData.append("Destination", Destination);
        formData.append("startDate", startDate.toISOString());
        formData.append("endDate", endDate.toISOString());
        formData.append("cost", cost.toString());
        formData.append("requirements", requirements);


        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };

        httpClient.post("/travelposts", formData, config)
            .then( (response) => {
                if (response.status === 200) {
                    setSubmitted(SubmissionStatus.SubmitSucceeded);
                } else {
                    setSubmitted(SubmissionStatus.SubmitFailed);
                }
            })
            .then(() => {
                navigate("/travelplans");
            });
    };
    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={4}>
                <Box textAlign="center">
                    <h1><strong>Create Travel Post</strong></h1>
                </Box>
                {
                    submitted === SubmissionStatus.SubmitFailed &&
                    <h3 className="text-red-500">CREATING Travel Post FAILED!</h3>
                }
                <Box my={4} textAlign="left">
                    <form>
                        <FormControl>
                            <FormLabel>Departure City</FormLabel>
                            <Input type="string" placeholder="City" value={FromlocationCity} onChange={e => setFromlocationCity(e.target.value)}/>
                        </FormControl>
                        <FormControl mt={6} isRequired>
                            <FormLabel>Departure State</FormLabel>
                            <Select placeholder='Select a state' value={FromlocationState} onChange={e => setFromlocationState(e.target.value)}>
                                {states.map((item) => (
                                    <option key={item}>{item}</option>))}
                            </Select>
                        </FormControl >
                        <FormControl mt={6} isRequired>
                            <FormLabel>Destination</FormLabel>
                            <Input type="string" placeholder="location" value={Destination} onChange={e => setDestination(e.target.value)} />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Travel Start date</FormLabel>
                            <Input type="date"   value={startDate?.toISOString().substring(0, 10)} onChange={(e) => setstartDate(new Date(e.target.value))} />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Travel End date</FormLabel>
                            <Input type="date"   value={endDate?.toISOString().substring(0, 10)}  onChange={(e) => setendDate(new Date(e.target.value))}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Space Available</FormLabel>
                            <NumberInput max={50} min={1} value={spaceAvailable ?? ""} onChange={newValue => setspaceAvailable(Number(newValue))}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Estimated Cost per person</FormLabel>
                            <Input type="number" value={cost ?? ""} onChange={(e) => setcost(Number(e.target.value))}/>
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Travel Requirements</FormLabel>
                            <Input type="textarea" value={requirements} onChange={e => setrequirements(e.target.value)} />
                        </FormControl>
                        <Button width="full" mt={4} type="submit" bg="blue.400" color="white" onClick={onUploadFile}>
                            Create
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    )
}
