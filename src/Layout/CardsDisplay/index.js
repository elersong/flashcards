import React, { useEffect, useState } from "react";
import {
  PlusCircleFill,
  JournalBookmarkFill,
  PencilFill,
  TrashFill,
} from "react-bootstrap-icons";
import { Link, useRouteMatch } from "react-router-dom";
import { listCards, readDeck } from "../../utils/api";

export default function CardsDisplay() {
  const { params } = useRouteMatch();
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const ABORT = new AbortController();
    const getCards = async () => {
      try {
        const response = await listCards(params.deckId, ABORT.signal);
        setCards(() => response);
      } catch (e) {
        if (e.name === "AbortError") {
          console.log(e);
        } else {
          throw e;
        }
      }
    };

    const getDeck = async () => {
      try {
        const response = await readDeck(params.deckId, ABORT.signal);
        setDeck(() => response);
      } catch (e) {
        if (e.name === "AbortError") {
          console.log(e);
        } else {
          throw e;
        }
      }
    };

    getCards();
    getDeck();

    return () => {
      ABORT.abort();
    };
  }, [params.deckId]);

  const cardsForDisplay = cards.map((card) => {
    return (
      <div key={card.id} className="card">
        <div className="card-body">
          <div className="row">
            <div className="col col-6">{card.front}</div>
            <div className="col col-6">{card.back}</div>
          </div>

          <div className="d-flex" style={{ marginTop: "10px" }}>
            {/* <Link to={`/${card.id}`}>
              <button className="btn btn-secondary" type="button">
                {" "}
                <Plus /> &nbsp; View
              </button>
            </Link> */}

            <Link to={`/${card.id}/study`} className="ml-auto">
              <button className="btn btn-secondary" type="button">
                {" "}
                <PencilFill />
                &nbsp; Edit
              </button>
            </Link>
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn-danger"
              type="button"
            >
              {" "}
              <TrashFill />
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active">
            <Link to={`/${deck.id}`}>{deck.name}</Link>
          </li>
        </ol>
      </nav>
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <div className="d-flex" style={{ marginBottom: "20px" }}>
        <Link to={`/${deck.id}/edit`}>
          <button className="btn btn-secondary" type="button">
            {" "}
            <PencilFill />
            &nbsp; Edit
          </button>
        </Link>
        <Link to={`/${deck.id}/study`}>
          <button
            className="btn btn-primary"
            style={{ marginLeft: "10px" }}
            type="button"
          >
            {" "}
            <JournalBookmarkFill />
            &nbsp; Study
          </button>
        </Link>
        <Link to={`/${deck.id}/new`}>
          <button
            className="btn btn-primary"
            style={{ marginLeft: "10px" }}
            type="button"
          >
            {" "}
            <PlusCircleFill />
            &nbsp; Add Cards
          </button>
        </Link>
        <button
          style={{ marginLeft: "10px" }}
          className="btn btn-danger ml-auto"
          type="button"
        >
          {" "}
          <TrashFill />
        </button>
      </div>
      <h2>Cards</h2>
      {cardsForDisplay}
    </React.Fragment>
  );
}
