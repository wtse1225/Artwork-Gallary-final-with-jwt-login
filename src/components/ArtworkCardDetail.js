import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Error from 'next/error';

export default function ArtworkCardDetail({objectID}) {
    // Use SWR to fetch data
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data) {
        return null;
    }

    // Assign fetched data into properties
    const { title, objectDate, classification, primaryImage, medium, artistDisplayName, artistWikidata_URL, creditLine, dimensions } = data;

    return (
        <Card>
            <Card.Img variant="top" src={primaryImage ? primaryImage : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />
            <Card.Body>
                <Card.Title>{title ? title : "N/A"}</Card.Title>
                <Card.Text>                    
                    <strong>Date:</strong> {objectDate ? objectDate : "N/A"}
                    <br/>
                    <strong>Classification:</strong> {classification ? classification : "N/A"}
                    <br/>
                    <strong>Medium:</strong> {medium ? medium : "N/A"}
                    <br/>
                    <br/>
                    <strong>Artist:</strong> {artistDisplayName ? (
                    <>
                        {artistDisplayName} (<a href={artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>)
                    </>
                    ) : "N/A"}
                    <br/>
                    <strong>Credit Line:</strong> {creditLine ? creditLine : "N/A"}
                    <br/>
                    <strong>Dimensions:</strong> {dimensions ? dimensions : "N/A"}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}