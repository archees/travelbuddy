import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { httpClient,getUserId } from "@/Services/HttpClient.tsx";
import {ReviewsService} from "@/Services/ReviewsService.tsx";
import { Card, CardHeader, CardBody, Heading, Text } from "@chakra-ui/react";
const domainid = import.meta.env.AUTH_DOMAIN;
const audience = import.meta.env.AUTH_AUDIENCE;
const scope = import.meta.env.AUTH_SCOPE;

const Profile = () => {

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    const [user_id,setuser_id]=useState(null);
    const [reviewer,setreviewer]=useState(null);
    const [review,setreview]=useState(null);
    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = domainid;

            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: audience,
                        scope: scope,
                    },
                });

                console.log("Access Token:", accessToken); // Print the access token to the console

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();

                setUserMetadata(user_metadata);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently]);
    const username=user.name
    useEffect(() => {
        const fetchuserid = (username) => {
            getUserId(username)
                .then((response) => setuser_id(response))
                .catch((err) => console.log("Error in fetch user_id", err));
        }
        fetchuserid(username);
    }, []);
    const handleReviews=async ()=>{
        const response = await ReviewsService.send(user_id);
        const userreviews = response.data;
        const items = userreviews.map((reviews) => {
            useEffect(() => {
                const fetchuserid = (poster) => {
                    getUserId(poster)
                        .then((response) => setreviewer(response))
                        .catch((err) => console.log("Error in fetch reviewername", err));
                }
                fetchuserid(reviews.reviewer_id);
            }, []);
            const reviewername = `${reviewer}`;
            const rating = `${reviews.rating}`;
            const content = (
                <div>
                    <p>Review: {reviews.comment}</p>
                </div>
            );
            return { reviewername, rating, content };
        });
        setreview(items);
    }
    useEffect(()=>{
        handleReviews()
    },[]);

    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <h3>User Metadata</h3>

                {userMetadata ? (
                    <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
                ) : (
                    "No user metadata defined"
                )}
                <h3><strong>Reviews</strong></h3>
                {review.map((review, index) => (
                    <Card key={index} marginBottom="1rem">
                        <CardHeader>
                            <Heading size="md">{review.reviewername}</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text>Rating: {review.rating}</Text>
                            {review.content}
                        </CardBody>
                    </Card>
                ))}
            </div>
        )
    );
};

export default Profile;
