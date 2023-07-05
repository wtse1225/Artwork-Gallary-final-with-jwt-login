import ArtworkCardDetail from "@/src/components/ArtworkCardDetail";
import { useRouter } from "next/router";
import {Row, Col } from "react-bootstrap";

export default function ArtworkById() {
    // Set up router to read query string and call ArtworkCardDetail for display
    const router = useRouter();
    const {objectID} = router.query;

    return (
        <>
            <Row>
                <Col>
                    <ArtworkCardDetail objectID={objectID} />
                </Col>
            </Row>
        </>
    )
}