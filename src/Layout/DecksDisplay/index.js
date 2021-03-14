import React from "react";
import { EyeFill, JournalBookmarkFill, TrashFill } from "react-bootstrap-icons";
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
    {decksForDisplay}
    </React.Fragment>;
}
