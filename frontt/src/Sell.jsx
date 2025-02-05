import React, { useState } from 'react';
import axios from 'axios';
import './Sell.css';

const apiUrl= "https://arts-github-io-2.onrender.com"
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
        const response = await axios.post(`${apiUrl}/api/products`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          const forumMessage = {
            name: formData.artist,
            email: formData.email,
            message: `New product added: ${formData.title} by ${formData.artist} for Rs.${formData.price}. Check it out!`,
          };

          await axios.post(`${apiUrl}/api/contact`, forumMessage);
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
      <h4 style={{textAlign:'center'}}>Fill the details</h4>
      <div id="data-to-sell" className="container5" style={{ margin: 'auto', alignSelf: 'center', marginBottom: '50px', borderRadius: '10px' }}>
        <form id="sell-form" onSubmit={handleSubmit}>
          <div className="container5" id="A" style={{ backgroundColor: 'antiquewhite' }}>
            <label htmlFor="title">
              <b>Title</b><br />
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
              <b>Artist</b><br />
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
              <b>Email</b><br />
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
              <b>Description</b><br />
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
              <b>Price</b><br />
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
            <b> Art</b>
              <input
                type="radio"
                id="art_or_craft_art"
                name="type"
                value="Art"
                checked={formData.type === 'Art'}
                onChange={handleChange}
              />
             <b> Craft</b>
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
            <b> Image</b><br />
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
            <b> Dimensions</b><br />
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
            <b> Materials</b><br />
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
            <b> Count</b><br />
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
