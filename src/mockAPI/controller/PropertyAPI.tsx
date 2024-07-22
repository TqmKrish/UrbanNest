import { PropertyDetails, propertyDetails } from "../DB/Properties";
import { v4 as uuidv4 } from "uuid";

export const getProperty = (id: string) => {
  return propertyDetails.filter((item: PropertyDetails) => item.id === id)[0];
};
export const getAllProperties = () => {
  console.log(propertyDetails);
  return propertyDetails;
};

export const getFilteredProperties = (param: string) => {
  return propertyDetails.filter((item: PropertyDetails) => {
    return (
      item.name?.toLowerCase()?.includes(param?.toLowerCase()) ||
      item.type?.toLowerCase()?.includes(param?.toLowerCase()) ||
      item.location?.toLowerCase()?.includes(param?.toLowerCase()) ||
      item.furnishing?.toLowerCase()?.includes(param?.toLowerCase())
    );
  });
};

export const addProperty = (newProperty: PropertyDetails) => {
  newProperty.id = uuidv4(); // Assign a new unique ID to the property
  propertyDetails.push(newProperty);
  return newProperty;
};

export const deleteProperty = (id: string) => {
  const index = propertyDetails.findIndex(
    (item: PropertyDetails) => item.id === id
  );
  if (index !== -1) {
    propertyDetails.splice(index, 1);
    return true;
  }
  return false;
};

export const updateProperty = (
  id: string,
  updatedDetails: Partial<PropertyDetails>
) => {
  const property = propertyDetails.find(
    (item: PropertyDetails) => item.id === id
  );
  if (property) {
    Object.assign(property, updatedDetails);
    return property;
  }
  return null;
};
