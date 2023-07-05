import useSWR from 'swr';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Error from 'next/error';

export default function ArtworkCard({objectID}) {
    // Use SWR to fetch data
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data) {
        return null;
    }

    // Assign fetched data into properties
    const { primaryImageSmall, title, objectDate, classification, medium } = data;

    // Display card of specific objectID + a button to navigate to ArtworkCardDetail
    return (
        <Card>
            <Card.Img variant="top" src={primaryImageSmall ? primaryImageSmall : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />
            <Card.Body>
                <Card.Title>{title ? title : "N/A"}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {objectDate ? objectDate : "N/A"}
                    <br/>
                    <strong>Classification:</strong> {classification ? classification : "N/A"}
                    <br/>
                    <strong>Medium:</strong> {medium ? medium : "N/A"}
                    <br/>
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Button variant="primary" >ID: {objectID}</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}