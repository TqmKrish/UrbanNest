import React, { useEffect, useState } from "react";
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
import SnackbarComponent from "../../../CommonComponents/Snackbar/SnackbarComponent";

const HomeComponent = () => {
  const searchValue = useSelector((state: any) => state.search.value);
  const axiosInstance = axios.create();
  MockAPI(axiosInstance);

  let [properties, setProperties] = useState<PropertyDetails[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState({
    type: "",
    content: "",
    autoHideDuration: 0,
  });
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (boolean: boolean) => {
    setSnackbarConfig({
      type: boolean ? "success" : "error",
      content: boolean ? "Added to Favorites" : "Removed form Favorites",
      autoHideDuration: 6000,
    });
    setSnackbarOpen(true);
  };

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

  const toggleFavorite = (id: string, index: number) => {
    let _properties = [...properties];
    _properties[index].isFavorite = !_properties[index].isFavorite;
    setProperties(_properties);
    axiosInstance
      .put(`/properties/${id}`, {
        isFavorite: _properties[index].isFavorite,
      })
      .then((res) => {
        res.data.property.isFavorite ? showSnackbar(true) : showSnackbar(false);
        console.log(res);
        // setProperty(res.data.property);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

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
            onClick={() => toggleFavorite(item.id, index)}
          >
            {item.isFavorite ? (
              <FaHeart style={{ color: "red" }} />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <SnackbarComponent
            open={snackbarOpen}
            onClose={handleSnackbarClose}
            type={snackbarConfig.type}
            content={snackbarConfig.content}
            autoHideDuration={snackbarConfig.autoHideDuration}
          />
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
