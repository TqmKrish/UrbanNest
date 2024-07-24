import React from "react";
import "./PropertyCard.scss";
import { PropertyDetails } from "../../../mockAPI/DB/PropertiesForBuy";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { MockAPI } from "../../../mockAPI/mockProvider";
import moment from "moment";

// Define the props interface
interface PropertyCardProps {
  property: PropertyDetails;
  index: number;
  onToggleFavorite: (id: string, index: number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  index,
  onToggleFavorite,
}) => {
  const axiosInstance = axios.create();
  MockAPI(axiosInstance);

  const formatDate = (dateString: string) => {
    const date = moment(dateString);
    if (date.isSame(moment(), "day")) {
      return "Today";
    } else if (date.isSame(moment().subtract(1, "day"), "day")) {
      return "Yesterday";
    } else {
      return date.format("DD MMMM");
    }
  };

  return (
    <div className="property-card">
      <button
        className="add-to-fav-btn"
        onClick={() => onToggleFavorite(property.id, index)}
      >
        {property.isFavorite ? (
          <FaHeart style={{ color: "red" }} />
        ) : (
          <FaRegHeart />
        )}
      </button>
      <Link
        to={`${property.id}`}
        state={{ property: property }}
        className="d-flex w-100 h-100 flex-column"
      >
        <img
          className="property-image"
          src={property.images[index % 3]}
          alt={property.name}
        />
        <div className="card-details">
          <span className="price">
            <FaRupeeSign />
            {property.price}
          </span>
          <span className="bhk">
            {`${property.bedrooms}Bhk - ${property.bathrooms}Ba - ${property.superBuiltUpArea} ft²`}
          </span>
          <span className="title">{property.title}</span>
          <span className="location-date">
            <span>{property.location}</span>
            <span>{formatDate(property.postedDate)}</span>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
