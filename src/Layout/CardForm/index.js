import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

export default function CardForm({ readDeck }) {
  const [formData, setFormData] = useState({front:"", back:""});
  const [deckInfo, setDeckInfo] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    const ABORT = new AbortController();
    const getDeck = async () => {
        const response = await readDeck(deckId, ABORT.signal);
        setDeckInfo(() => response);
    }

    getDeck();

    return () => {
        ABORT.abort();
    }
  }, [deckId, readDeck])

  const handleChange = (e) => {
    const property = e.target.id;
    const value = e.target.value;
    const newFormData = {...formData};
    newFormData[property] = value;
    setFormData(() => newFormData);
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
          <li className="breadcrumb-item active">
            Create Card
          </li>
        </ol>
      </nav>
      <h2>Create Card</h2>

      <form>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea value={formData.front} onChange={handleChange} className="form-control" rows="3" id="front"></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea value={formData.back} onChange={handleChange} className="form-control" rows="3" id="back"></textarea>
        </div>

        <button className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary" style={{marginLeft: "10px"}}>Submit</button>
      </form>
    </React.Fragment>
  );
}
