import React, { useState } from 'react';

function Sell() {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    description: '',
    price: '',
    type: '',
    file: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? (checked ? value : formData[name]) : value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const confirmation = window.confirm('Are you sure you want to submit this data?');

    if (confirmation) {
      // Perform your submission logic here
      // For example, you can use fetch or axios to send the form data to your server
      alert('Form submitted successfully!');
      // Reset form after submission
      setFormData({
        title: '',
        artist: '',
        description: '',
        price: '',
        type: '',
        file: ''
      });
    } else {
      alert('Form submission canceled.');
    }
  };

  return (
    <div id="data-to-sell" className="card" style={{ margin: 'auto', alignSelf: 'center', width: '1000px' }}>
      <form id="sell-form" onSubmit={handleSubmit}>
        <div className="card-body" style={{ backgroundColor: 'antiquewhite' }}>
          <label htmlFor="title">Title<br />
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required /></label><br />

          <label htmlFor="Artist">Artist<br />
            <input type="text" id="Artist" name="artist" value={formData.artist} onChange={handleChange} required /></label><br />
          <label htmlFor="Description">Description<br />
            <input type="text" id="Description" name="description" value={formData.description} onChange={handleChange} required /></label><br />
          <label htmlFor="Price">Price<br />
            <input type="text" id="Price" name="price" value={formData.price} onChange={handleChange} required /></label><br />
          <label htmlFor="art_or_craft">
            Art <input type="radio" id="art_or_craft_art" name="type" value="Art" checked={formData.type === 'Art'} onChange={handleChange} />
            Craft <input type="radio" id="art_or_craft_craft" name="type" value="Craft" checked={formData.type === 'Craft'} onChange={handleChange} />
          </label><br />
          <div className="input-group">
            <input type="file" className="form-control" id="inputGroupFile04" onChange={handleFileChange} aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
          </div>
          <label htmlFor="submit">
            <input type="submit" id="submit" value="Submit" />
          </label><br />
        </div>
      </form>
    </div>
  );
}

export default Sell;
