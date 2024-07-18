import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.scss";

const CarouselComponent = ({ carouselImages }: any) => {
  return (
    <Carousel data-bs-theme="dark">
      {carouselImages?.map((image: any, index: number) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 carousel-image"
            src={image}
            alt="First slide"
          />
          {/* <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
