import React, { useEffect, useState } from "react";
import "./RentComponent.scss";
import axios from "axios";
import { MockAPI } from "../../../../../mockAPI/mockProvider";
import { PropertyDetails } from "../../../../../mockAPI/DB/Properties/PropertiesForBuy";
import PropertyCard from "../../../CommonComponents/PropertyCard/PropertyCard";

const RentComponent = () => {
  const axiosInstance = axios.create();
  MockAPI(axiosInstance);

  let [properties, setProperties] = useState<PropertyDetails[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/getAllProperties/rent")
      .then((res: any) => {
        setProperties(res.data.properties);
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  }, []);

  // useEffect(() => {
  //   axiosInstance
  //     .get(`/filterProperties/${searchValue}`)
  //     .then((res: any) => {
  //       setProperties(res.data.properties);
  //     })
  //     .catch((error: any) => {
  //       console.log("error", error);
  //     });
  // }, [searchValue]);

  const handleToggleFavorite = (id: string, index: number) => {
    let _properties = [...properties];
    _properties[index].isFavorite = !_properties[index].isFavorite;
    setProperties(_properties);
    axiosInstance
      .put(`/properties/rent/${id}`, {
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
    <div className="property-container">
      {properties.length > 0 ? (
        properties.map((item, index) => (
          <PropertyCard
            property={item}
            index={index} // Ensure index or another unique value for key if needed
            key={item.id} // Use item.id for the unique key prop
            onToggleFavorite={handleToggleFavorite}
          />
        ))
      ) : (
        <p>No properties available</p> // Optional: display a message if there are no properties
      )}
    </div>
  );
};

export default RentComponent;
