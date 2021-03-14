import React from 'react';

export default function DecksDisplay({ decks }) {
    const decksForDisplay = decks.map(deck => { return <p>{deck.name}</p>})
    return (<div>{decksForDisplay}</div>);
}