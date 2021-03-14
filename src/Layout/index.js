import React, {useState, useEffect} from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DecksDisplay from "./DecksDisplay/index";
import CardsDisplay from "./CardsDisplay"
import { listDecks } from "../utils/api/index";

function Layout() {
  const [decks, setDecks] = useState([]);
  //const {path, url} = useRouteMatch();

  // Retrieve all decks from the api for display on home page
  useEffect(() => {
    const ABORT = new AbortController();
    const getDecks = async () => {
      try {
        const data = await listDecks();
        setDecks(() => { return data })
      } catch (e) {
        if (e.name === "AbortError") {
          console.log(e)
        } else {
          throw e;
        }
      }
    }

    getDecks();

    return () => {
      ABORT.abort();
    }

  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/:deckId" exact>
            <CardsDisplay />
          </Route>
          <Route path="/" exact>
            <DecksDisplay decks={decks}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
