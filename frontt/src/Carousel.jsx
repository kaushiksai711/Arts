import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Carousel() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <ol className="carousel-indicators">
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src="https://img.freepik.com/free-photo/abstract-nature-illustration-tree-backdrop-watercolor-painted-image-generated-by-ai_188544-15564.jpg" alt="First slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src='/pics_web/treee.jpg' alt="Second slide" />
        </div>
        <div className="carousel-item">
        <video className="d-block w-100" autoPlay loop >
            <source src='/IMG_6173.mp4' type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </a>
    </div>
  );
}

export default Carousel;
