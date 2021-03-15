import React, {useState, useEffect} from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DecksDisplay from "./DecksDisplay/index";
import CardsDisplay from "./CardsDisplay";
import DeckForm from './DeckForm';
import CardForm from './CardForm';
import Study from './Study';
import { listDecks, readDeck, listCards, readCard, createDeck, deleteDeck, updateCard, createCard } from "../utils/api/index";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [decksHaveChanged, setDecksHaveChanged] = useState(false);
  let history = useHistory();

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

  // pass a deletion handler as needed
  const handleDelete = (idValue) => {
    const ABORT = new AbortController();

    const removeDeck = async () => {
      try {
        const response = await deleteDeck(idValue, ABORT.signal);
        console.log("Successfully deleted", response)
        setDecksHaveChanged(true);
        history.push("/")
      } catch (e) {
        if (e.name === "AbortError") {
          console.log(e);
        } else {
          throw e;
        }
      }
    }

    removeDeck();

    return () => {
      ABORT.abort();
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/:deckId/cards/:cardId/edit">
            <CardForm role="Edit" readDeck={readDeck} readCard={readCard} updateCard={updateCard} />
          </Route>
          <Route path="/:deckId/cards/new">
            <CardForm role="Create" readDeck={readDeck} createCard={createCard} />
          </Route>
          <Route path="/:deckId/study">
            <Study readDeck={readDeck} listCards={listCards} />
          </Route>
          <Route path="/new" exact>
            <DeckForm role="Create" createDeck={createDeck} reload={setDecksHaveChanged} />
          </Route>
          <Route path="/:deckId">
            <CardsDisplay handleDelete={handleDelete} />
          </Route>
          <Route path="/">
            <DecksDisplay decks={decks} handleDelete={handleDelete} />
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
