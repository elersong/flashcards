import React, { useEffect, useState } from "react";
import { Plus, JournalBookmarkFill, PencilFill } from "react-bootstrap-icons";
import { Link, useRouteMatch } from "react-router-dom";
import {listCards} from "../../utils/api";

export default function CardsDisplay() {
  const {params} = useRouteMatch();
  const [cards, setCards] = useState([]);

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
    }

    getCards();

    return () => {
      ABORT.abort();
    }
  }, [params.deckId])

  const cardsForDisplay = cards.map((card) => {
    return (
      <div key={card.id} className="card">
        <div className="card-body">
          <div className="col"> Things to note</div>
          <div className="col"> Other things to note</div>

          <div className="d-flex">
            <Link to={`/${card.id}`}>
              <button className="btn btn-secondary" type="button">
                {" "}
                <Plus /> &nbsp; View
              </button>
            </Link>
            <Link to={`/${card.id}/study`}>
              <button
                className="btn btn-primary"
                type="button"
                style={{ marginLeft: "10px" }}
              >
                {" "}
                <JournalBookmarkFill />
                &nbsp; Study
              </button>
            </Link>
            <button className="btn btn-danger ml-auto" type="button">
              {" "}
              <PencilFill />
            </button>
          </div>
        </div>
      </div>
    );
  });

  return <React.Fragment>{cardsForDisplay}</React.Fragment>;
}
