import React from "react";
import {EyeFill, JournalBookmarkFill, TrashFill} from 'react-bootstrap-icons';

export default function DecksDisplay({ decks }) {
  const decksForDisplay = decks.map((deck) => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>

          <div className="d-flex">
          <button class="btn btn-secondary" type="button"> <EyeFill /> &nbsp;
            View 
          </button>
          <button class="btn btn-primary" type="button" style={{marginLeft: "10px"}}> <JournalBookmarkFill />&nbsp;
            Study
          </button>
          <button class="btn btn-danger ml-auto" type="button"> <TrashFill />
            
          </button>
          </div>
          
        </div>
      </div>
    );
  });

  return <React.Fragment>{decksForDisplay}</React.Fragment>;
}
