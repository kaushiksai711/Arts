import React, { useState } from 'react';
import axios from 'axios';
import './Sell.css';

function Sell() {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    email: '',
    description: '',
    price: '',
    type: '',
    image: null, // Change to handle file
    dimensions: '',
    materials: '',
    count: 1, // Default value for count
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? (checked ? value : formData[name]) : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm('Are you sure you want to submit this data?');

    if (confirmation) {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('artist', formData.artist);
      data.append('email', formData.email);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('type', formData.type);
      data.append('image', formData.image);
      data.append('dimensions', formData.dimensions);
      data.append('materials', formData.materials);
      data.append('count', formData.count);

      try {
        const response = await axios.post('http://localhost:5000/api/products', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          alert('Product added successfully!');
          setFormData({
            title: '',
            artist: '',
            email: '',
            description: '',
            price: '',
            type: '',
            image: null,
            dimensions: '',
            materials: '',
            count: 1,
          });
        }
      } catch (error) {
        console.error('Error adding product:', error.response ? error.response.data.message : error.message);
      }
    } else {
      alert('Form submission canceled.');
    }
  };

  return (
    <div>
      <h4>Fill the details</h4>
      <div id="data-to-sell" className="card" style={{ margin: 'auto', alignSelf: 'center', width: '1000px', marginBottom: '50px', borderRadius: '10px' }}>
        <form id="sell-form" onSubmit={handleSubmit}>
          <div className="card-body" style={{ backgroundColor: 'antiquewhite' }}>
            <label htmlFor="title">
              Title<br />
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label><br />

            <label htmlFor="Artist">
              Artist<br />
              <input
                type="text"
                id="Artist"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                required
              />
            </label><br />
            <label htmlFor="Email">
              Email<br />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label><br />

            <label htmlFor="Description">
              Description<br />
              <input
                type="text"
                id="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </label><br />

            <label htmlFor="Price">
              Price<br />
              <input
                type="number"
                id="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </label><br />

            <label htmlFor="art_or_craft">
              Art
              <input
                type="radio"
                id="art_or_craft_art"
                name="type"
                value="Art"
                checked={formData.type === 'Art'}
                onChange={handleChange}
              />
              Craft
              <input
                type="radio"
                id="art_or_craft_craft"
                name="type"
                value="Craft"
                checked={formData.type === 'Craft'}
                onChange={handleChange}
              />
            </label><br />

            <label htmlFor="Image">
              Image<br />
              <input
                type="file"
                id="Image"
                name="image"
                accept=".jpeg"
                onChange={handleFileChange}
                required
              />
            </label><br />

            <label htmlFor="Dimensions">
              Dimensions<br />
              <input
                type="text"
                id="Dimensions"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                required
              />
            </label><br />

            <label htmlFor="Materials">
              Materials<br />
              <input
                type="text"
                id="Materials"
                name="materials"
                value={formData.materials}
                onChange={handleChange}
                required
              />
            </label><br />

            <label htmlFor="Count">
              Count<br />
              <input
                type="number"
                id="Count"
                name="count"
                value={formData.count}
                onChange={handleChange}
                required
              />
            </label><br />

            <label htmlFor="submit">
              <button
                type="submit"
                id="submit"
                value="Submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </label><br />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sell;
