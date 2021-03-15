import React, {useState, useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DecksDisplay from "./DecksDisplay/index";
import CardsDisplay from "./CardsDisplay";
import DeckForm from './DeckForm';
import CardForm from './CardForm';
import Study from './Study';
import { listDecks, readDeck, listCards, createDeck, deleteDeck } from "../utils/api/index";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [decksHaveChanged, setDecksHaveChanged] = useState(false);
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
    setDecksHaveChanged(false);

    return () => {
      ABORT.abort();
    }

  }, [decksHaveChanged]);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/:deckId/cards/new">
            <CardForm readDeck={readDeck} />
          </Route>
          <Route path="/:deckId/study">
            <Study readDeck={readDeck} listCards={listCards} />
          </Route>
          <Route path="/new" exact>
            <DeckForm role="Create" createDeck={createDeck} reload={setDecksHaveChanged} />
          </Route>
          <Route path="/:deckId">
            <CardsDisplay />
          </Route>
          <Route path="/">
            <DecksDisplay decks={decks} deleteDeck={deleteDeck} reload={setDecksHaveChanged} />
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
