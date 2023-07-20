import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { ListGroup, Button, Card } from "react-bootstrap";
import styles from '@/styles/History.module.css';

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    // Loop through the searchHistory to get a list of parsed search queries
    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    })

    // Direct the user to the path
    const historyClicked = (e, index) => {
        //e.stopPropagation(); 
        router.push(`/artwork?${searchHistory[index]}`);
    }

    // Remove an element from searchHistory list
    const removeHistoryClicked = (e, index) => {
        //e.stopPropagation(); // Needed to remove this line or warning: Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
        setSearchHistory(current => {
            let x = [...current];
            x.splice(index, 1)
            return x;
        });
    }

    return (
        <>
            {parsedHistory.length > 0 ? (
                <ListGroup>
                    {parsedHistory.map((parsedHistory, index) => (
                        <ListGroup.Item className={styles.historyListItem} key={index} onClick={(e) => historyClicked(e, index)}>
                            {Object.keys(parsedHistory).map((key) => (
                                <span key={key}>
                                    {key}: <strong>{parsedHistory[key]}</strong>&nbsp;
                                </span>
                            ))}
                            <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (

                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4>
                        <p>Try searching for some artwork</p>
                    </Card.Body>
                </Card>
            )}
        </>
    )
}