import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function DeckForm() {
  const [formData, setFormData] = useState({name:"", description:""});

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
          <li className="breadcrumb-item active">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>

      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input value={formData.name} onChange={handleChange} className="form-control" id="name" type="text" placeholder="Deck Name"></input>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea value={formData.description} onChange={handleChange} className="form-control" rows="3" id="description" placeholder="Brief description of the deck"></textarea>
        </div>

        <button className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary" style={{marginLeft: "10px"}}>Submit</button>
      </form>
    </React.Fragment>
  );
}
