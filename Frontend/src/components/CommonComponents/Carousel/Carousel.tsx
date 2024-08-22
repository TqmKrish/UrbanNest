import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.scss";
import { envUrl } from "../../../GlobalVariables";

const CarouselComponent = ({ carouselImages, parent }: any) => {
  return (
    <Carousel data-bs-theme="dark" className="h-100">
      {carouselImages?.map((image: any, index: number) => (
        <Carousel.Item key={index} className="h-100">
          <img
            className="d-block w-100 carousel-image"
            src={parent === "contact-us" ? image : envUrl + image}
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
