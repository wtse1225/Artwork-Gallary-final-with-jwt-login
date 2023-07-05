import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {Row, Col, Card, Pagination} from 'react-bootstrap';
import useSWR from 'swr';
import Error from "next/error";
import ArtworkCard from "@/src/components/ArtworkCard";

const PER_PAGE = 12;

export default function Artwork() {
    // setup states for artworkList and page
    const [artworkList, setArtworkList] = useState(null);
    const [page, setPage] = useState(1);

    // setup router to get the full value of the query string    
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    //const finalQuery = "q=painting&departmentIds=11&hasImages=true";

    // Use SWR to fetch data
    let fetchUrl = finalQuery ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}` : null;
    const { data, error } = useSWR(fetchUrl);

    // Exception handling
    if (error) {
        return <Error statusCode={404} />;
    }

    // Declare previousPage function
    function previousPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    // Declare nextPage function
    function nextPage() {
        if (page < artworkList.length) {
            setPage(page + 1);
        }
    }

    // UseEffect Hook to populate a 2D array of data for paging for artworkList
    useEffect(() => {
        if (data) {
            let results = [];

            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
            setPage(1);
        }
    }, [data]);

    // Iterate the artworkList to call ArtworkCard component + Pagination + Not found condition
    return (
        <>
            {artworkList ?
                <>
                    {artworkList.length > 0 && (
                        <Row className="gy-4">
                            {artworkList[page - 1].map((currentObjectID) => (
                                <Col lg={3} key={currentObjectID}>
                                    <ArtworkCard objectID={currentObjectID} />
                                </Col>
                            ))}
                        </Row>
                    )}

                    {artworkList.length > 0 && (
                        <Row>
                            <Col>
                                <Pagination>
                                    <Pagination.Prev onClick={previousPage} />
                                    <Pagination.Item>{page}</Pagination.Item>
                                    <Pagination.Next onClick={nextPage} />
                                </Pagination>
                            </Col>
                        </Row>
                    )}

                    {artworkList.length === 0 && (
                        <Card>
                            <Card.Body>
                                <h4>Nothing Here</h4>
                                <p>Try searching for something else</p>
                            </Card.Body>
                        </Card>

                    )}
                </>
                : null}
        </>
    )
}