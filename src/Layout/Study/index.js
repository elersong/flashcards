import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Study({ readDeck, listCards }) {
  const { deckId } = useParams();
  const [deckInfo, setDeckInfo] = useState({});
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({orderId: 1, displayFront: true});

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
    const newCurrentCard = {...currentCard, ...cards[0]};
    setCurrentCard(() => newCurrentCard );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards])

  const handleFlip = (e) => {
    const newCurrentCard = {...currentCard, displayFront: !currentCard.displayFront};
    setCurrentCard(() => newCurrentCard);
  }

  const showCardContent = () => {
    return currentCard.displayFront ? currentCard.front : currentCard.back;
  }

  const handleNextCard = (e) => {
    const nextCardId = (currentCard.orderId >= cards.length) ? 0 : currentCard.orderId;
    const newCurrentCard = {orderId: (nextCardId+1), displayFront: true, ...cards[nextCardId]};
    setCurrentCard(() => newCurrentCard);
  }

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/${deckInfo.id}`}>{deckInfo.name}</Link>
          </li>
          <li className="breadcrumb-item active">Study</li>
        </ol>
      </nav>
      <h2 style={{ marginBottom: "15px" }}>{`${deckInfo.name}: Study`}</h2>
      <div className="card">
        <div className="card-body">
          <h4>{`Card ${currentCard.orderId} of ${cards.length}`}</h4>
          <p>{showCardContent()}</p>

          <button onClick={handleFlip} renderAs={Link} class="btn btn-secondary" type="button">
            Flip
          </button>
          <button
            onClick={handleNextCard}
            class="btn btn-primary"
            type="button"
            style={{ marginLeft: "10px" }}
          >
            Next
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}