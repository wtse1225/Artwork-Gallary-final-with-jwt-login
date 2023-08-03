import { favouritesAtom, searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { getFavourites, getHistory } from "@/lib/userData";
import { useEffect } from "react";

const PUBLIC_PATHS = ['/register'];

export default function RouteGuard(props) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    async function updateAtoms() {
        try {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
        } catch (error) {} // unnecessary to show these errors since the user has not logged in.
    }

    useEffect(() => {
        updateAtoms();
    }, []);

    return <>{props.children}</>
}