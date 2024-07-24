import React, { useEffect, useState } from "react";
import "./RentComponent.scss";
import axios from "axios";
import { MockAPI } from "../../../../../mockAPI/mockProvider";
import { PropertyDetails } from "../../../../../mockAPI/DB/PropertiesForBuy";
import PropertyCard from "../../../../CommonComponents/PropertyCard/PropertyCard";

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
        // setProperty(res.data.property);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
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
  );
};

export default RentComponent;
