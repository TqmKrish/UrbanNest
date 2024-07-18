import React, { useCallback, useEffect, useState } from "react";
import "./HomeComponent.scss";
import { Link } from "react-router-dom";
import "./HomeComponent.scss";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { MockAPI } from "../../../../../mockAPI/mockProvider";
import { PropertyDetails } from "../../../../../mockAPI/DB/Properties";

const HomeComponent = () => {
  const searchValue = useSelector((state: any) => state.search.value);
  const axiosInstance = axios.create();
  MockAPI(axiosInstance);

  let [properties, setProperties] = useState<PropertyDetails[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/getAllProperties")
      .then((res: any) => {
        setProperties(res.data.properties);
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  }, []);

  const toggleFavorite = (index: number) => {
    let _properties = [...properties];
    _properties[index].isFavorite = !_properties[index].isFavorite;
    setProperties(_properties);
  };

  // const filterProperties = useCallback(() => {
  //   const filteredProperties = propertyDetails.filter(
  //     (item: PropertyDetails) => {
  //       return (
  //         item.name?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
  //         item.type?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
  //         item.location?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
  //         item.furnishing?.toLowerCase()?.includes(searchValue?.toLowerCase())
  //       );
  //     }
  //   );
  //   setProperties(filteredProperties);
  // }, [searchValue]);

  useEffect(() => {
    axiosInstance
      .get(`/filterProperties/${searchValue}`)
      .then((res: any) => {
        setProperties(res.data.properties);
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  }, [searchValue]);

  const formatDate = (dateString: string) => {
    const date = moment(dateString);
    if (date.isSame(moment(), "day")) {
      return "today";
    } else if (date.isSame(moment().subtract(1, "day"), "day")) {
      return "yesterday";
    } else {
      return date.format("DD MMMM");
    }
  };

  return (
    <div className="property-container">
      {properties.map((item, index) => (
        <div className="property-card" key={item.id}>
          <button
            className="add-to-fav-btn"
            onClick={() => toggleFavorite(index)}
          >
            {item.isFavorite ? (
              <FaHeart style={{ color: "red" }} />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <Link
            to={`${item.id}`}
            state={{ property: item }}
            className="d-flex w-100 h-100 flex-column"
          >
            <img
              className="property-image"
              src={item.images[index % 3]}
              alt={item.name}
            />
            <div className="card-details">
              <span className="price">
                <FaRupeeSign />
                {item.price}
              </span>
              <span className="bhk">
                {`${item.bedrooms}Bhk - ${item.bathrooms}Ba - ${item.superBuiltUpArea} ft²`}
              </span>
              <span className="title">{item.title}</span>
              <span className="location-date">
                <span>{item.location}</span>
                <span>{formatDate(item.postedDate)}</span>
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomeComponent;
