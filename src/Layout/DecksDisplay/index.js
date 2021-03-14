import React from "react";

export default function DecksDisplay({ decks }) {
  const decksForDisplay = decks.map((deck) => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>

          <div className="d-flex">
          <button class="btn btn-primary" type="button">
            Button
          </button>
          <button class="btn btn-primary" type="button">
            Button
          </button>
          <button class="btn btn-primary ml-auto" type="button">
            Button
          </button>
          </div>
          
        </div>
      </div>
    );
  });

  return <React.Fragment>{decksForDisplay}</React.Fragment>;
}
