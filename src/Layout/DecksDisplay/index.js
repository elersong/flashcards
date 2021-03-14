import React from "react";
import { EyeFill, JournalBookmarkFill, TrashFill, PlusCircleFill } from "react-bootstrap-icons";
import { Route, Link, useRouteMatch } from "react-router-dom";
import CardsDisplay from "../CardsDisplay"

export default function DecksDisplay({ decks }) {
  const { path, url } = useRouteMatch();
  const decksForDisplay = decks.map((deck) => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>

          <div className="d-flex">
            <Link to={`/${deck.id}`}>
              <button renderAs={Link} class="btn btn-secondary" type="button">
                {" "}
                <EyeFill /> &nbsp; View
              </button>
            </Link>
            <Link to={`/${deck.id}/study`}>
              <button
                class="btn btn-primary"
                type="button"
                style={{ marginLeft: "10px" }}
              >
                {" "}
                <JournalBookmarkFill />
                &nbsp; Study
              </button>
            </Link>
            <button class="btn btn-danger ml-auto" type="button">
              {" "}
              <TrashFill />
            </button>
          </div>
        </div>
      </div>
    );
  });

  return <React.Fragment>
    <Link to="/new">
          <button
            className="btn btn-secondary"
            style={{ marginBottom: "25px" }}
            type="button"
          >
            {" "}
            <PlusCircleFill />
            &nbsp; Create Deck
          </button>
        </Link>
    {decksForDisplay}
    </React.Fragment>;
}
