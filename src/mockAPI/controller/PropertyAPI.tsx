import { PropertyDetails, propertyDetails } from "../DB/Properties";

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
