import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { PlusCircleFill } from "react-bootstrap-icons";

export default function Study({ readDeck, listCards }) {
  const { deckId } = useParams();
  const [deckInfo, setDeckInfo] = useState({});
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({
    orderId: 1,
    displayFront: true,
  });
  const history = useHistory();

  useEffect(() => {
    const ABORT = new AbortController();
    const getDeck = async () => {
      const response = await readDeck(deckId, ABORT.signal);
      setDeckInfo(() => response);
    };
    const getCards = async () => {
      const response = await listCards(deckId, ABORT.signal);
      setCards(() => response);
    };

    getDeck();
    getCards();

    return () => {
      ABORT.abort();
    };
  }, [deckId, readDeck, listCards]);

  useEffect(() => {
    const newCurrentCard = { ...currentCard, ...cards[0] };
    setCurrentCard(() => newCurrentCard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const handleFlip = (e) => {
    const newCurrentCard = {
      ...currentCard,
      displayFront: !currentCard.displayFront,
    };
    setCurrentCard(() => newCurrentCard);
  };

  const showCardContent = () => {
    return currentCard.displayFront ? currentCard.front : currentCard.back;
  };

  const handleNextCard = (e) => {
    const nextCardId =
      currentCard.orderId >= cards.length ? false : currentCard.orderId;
    if (nextCardId) {
      const newCurrentCard = {
        orderId: nextCardId + 1,
        displayFront: true,
        ...cards[nextCardId],
      };
      setCurrentCard(() => newCurrentCard);
    } else {
      // If this is the last card, show the restart modal 
      const confirmMsg = "Restart the cards? \n\nClick 'Cancel' to return to home page.";
      if (window.confirm(confirmMsg)) {
        const newCurrentCard = {
          orderId: 1,
          displayFront: true,
          ...cards[0]
        }
        setCurrentCard(() => newCurrentCard)
      } else {
        history.push("/");
      }
    }
  };

  const studyContent = (() => {
    let nextButton;
    if (!currentCard.displayFront) {
      nextButton = <button
      onClick={handleNextCard}
      className="btn btn-primary"
      type="button"
      style={{ marginLeft: "10px" }}
    >
      Next
    </button>;
    } else {
      nextButton = (null);
    }
    if (cards.length >= 3) {
      return (
        <div className="card">
          <div className="card-body">
            <h4>{`Card ${currentCard.orderId} of ${cards.length}`}</h4>
            <p>{showCardContent()}</p>

            <button
              onClick={handleFlip}
              className="btn btn-secondary"
              type="button"
            >
              Flip
            </button>
            {nextButton}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Not enough cards.</h2>
          <p>
            You need at least 3 cards to study. There are {cards.length} cards
            this deck.
          </p>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button className="btn btn-primary" type="button">
              {" "}
              <PlusCircleFill />
              &nbsp; Add Cards
            </button>
          </Link>
        </div>
      );
    }
  })();

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckInfo.id}`}>{deckInfo.name}</Link>
          </li>
          <li className="breadcrumb-item active">Study</li>
        </ol>
      </nav>
      <h2 style={{ marginBottom: "15px" }}>{`${deckInfo.name}: Study`}</h2>
      {studyContent}
    </React.Fragment>
  );
}
