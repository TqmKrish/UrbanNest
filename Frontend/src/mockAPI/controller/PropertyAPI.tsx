import { PropertyDetails, propertiesForBuy } from "../DB/Properties/PropertiesForBuy";
import { v4 as uuidv4 } from "uuid";
import image1 from "../../assets/images/2224.jpg";
import image2 from "../../assets/images/10276.jpg";
import image3 from "../../assets/images/logo_make_11_06_2023_8.jpg";
import { propertiesForRent } from "../DB/Properties/PropertiesForRent";

export const getPropertyForBuy = (id: string) => {
  return propertiesForBuy.filter((item: PropertyDetails) => item.id === id)[0];
};

export const getPropertyForRent = (id: string) => {
  return propertiesForRent.filter((item: PropertyDetails) => item.id === id)[0];
};

export const getAllPropertiesForBuy = () => {
  return propertiesForBuy;
};

export const getAllPropertiesForRent = () => {
  return propertiesForRent;
};

export const getFilteredProperties = (param: string) => {
  return propertiesForBuy.filter((item: PropertyDetails) => {
    return (
      item.name?.toLowerCase()?.includes(param?.toLowerCase()) ||
      item.type?.toLowerCase()?.includes(param?.toLowerCase()) ||
      item.location?.toLowerCase()?.includes(param?.toLowerCase()) ||
      item.furnishing?.toLowerCase()?.includes(param?.toLowerCase())
    );
  });
};

export const addProperty = (newProperty: any) => {
  newProperty.id = uuidv4(); // Assign a new unique ID to the property
  newProperty.images = [image1, image2, image3];
  propertiesForBuy.push(newProperty);
  return newProperty;
};

export const deleteProperty = (id: string) => {
  const index = propertiesForBuy.findIndex(
    (item: PropertyDetails) => item.id === id
  );
  if (index !== -1) {
    propertiesForBuy.splice(index, 1);
    return true;
  }
  return false;
};

export const updatePropertyForBuy = (
  id: string,
  updatedDetails: Partial<PropertyDetails>
) => {
  const property = propertiesForBuy.find(
    (item: PropertyDetails) => item.id === id
  );
  if (property) {
    Object.assign(property, updatedDetails);
    return property;
  }
  return null;
};

export const updatePropertyForRent = (
  id: string,
  updatedDetails: Partial<PropertyDetails>
) => {
  const property = propertiesForRent.find(
    (item: PropertyDetails) => item.id === id
  );
  if (property) {
    Object.assign(property, updatedDetails);
    return property;
  }
  return null;
};

export const updateReview = (propertyId: string, review: any) => {
  return review;
};
