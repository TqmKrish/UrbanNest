import React, { useEffect, useState } from "react";
import "./BuyComponent.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { MockAPI } from "../../../../../mockAPI/mockProvider";
import { PropertyDetails } from "../../../../../mockAPI/DB/Properties/PropertiesForBuy";
import PropertyCard from "../../../CommonComponents/PropertyCard/PropertyCard";
import AISearch from "../../AISearch/AISearch";

const BuyComponent = () => {
  const searchValue = useSelector((state: any) => state.search.value);
  const axiosInstance = axios.create();
  MockAPI(axiosInstance);

  let [properties, setProperties] = useState<PropertyDetails[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/getAllProperties/buy")
      .then((res: any) => {
        setProperties(res.data.properties);
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  }, []);

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

  const handleToggleFavorite = (id: string, index: number) => {
    let _properties = [...properties];
    _properties[index].isFavorite = !_properties[index].isFavorite;
    setProperties(_properties);
    axiosInstance
      .put(`/properties/buy/${id}`, {
        isFavorite: _properties[index].isFavorite,
      })
      .then((res) => {
        console.log(res);
        _properties[index].isFavorite
          ? alert("Added to Favorites")
          : alert("Removed from Favorites");
        // setProperty(res.data.property);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <div className="search-container">
        <AISearch parent="buy" />
      </div>
      <div className="property-container">
        {properties.map((item, index) => (
          <PropertyCard
            property={item}
            index={index}
            key={item.id}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </>
  );
};

export default BuyComponent;
