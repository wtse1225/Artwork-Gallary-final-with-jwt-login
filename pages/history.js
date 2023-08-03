import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { ListGroup, Button, Card } from "react-bootstrap";
import styles from '@/styles/History.module.css';
import { removeFromHistory } from "@/lib/userData";
import { favouritesAtom } from "@/store";

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [favouritesList] = useAtom(favouritesAtom);
    const router = useRouter();
    if(!favouritesList) return null;

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
    async function removeHistoryClicked(e, index) {
        //setSearchHistory(await removeFromHistory(searchHistory[index]));
        removeFromHistory(searchHistory[index]).then((updatedHistory) => {
            setSearchHistory(updatedHistory);
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