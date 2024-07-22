import {
  getProperty,
  getAllProperties,
  getFilteredProperties,
  updateProperty,
  deleteProperty,
  addProperty,
} from "./controller/PropertyAPI";
import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

export const MockAPI = (axiosInstance: AxiosInstance) => {
  let mock = new MockAdapter(axiosInstance);

  mock.onGet(/\/properties\/\d+/).reply((config) => {
    const propertyId = decodeURIComponent(config.url?.split("/").pop() || "");
    const property = getProperty(propertyId);
    if (property) {
      return [200, { property }];
    } else {
      return [404, { message: "Property not found" }];
    }
  });

  mock.onGet("/getAllProperties").reply(() => {
    const properties = getAllProperties();
    if (properties && properties.length) {
      return [200, { properties }];
    } else {
      return [404, { message: "Something went wrong" }];
    }
  });

  mock.onGet(/\/filterProperties\/+/).reply((config) => {
    const searchParam = decodeURIComponent(config.url?.split("/").pop() || "");
    const properties = getFilteredProperties(searchParam);
    if (properties) {
      return [200, { properties }];
    } else {
      return [404, { message: "Property not found" }];
    }
  });

  // Adding new property
  mock.onPut("/properties").reply((config) => {
    const newProperty = JSON.parse(config.data);
    const addedProperty = addProperty(newProperty);
    if (addedProperty) {
      return [201, { property: addedProperty }];
    } else {
      return [400, { message: "Failed to add property" }];
    }
  });

  // Deleting property
  mock.onDelete(/\/properties\/\d+/).reply((config) => {
    const propertyId = decodeURIComponent(config.url?.split("/").pop() || "");
    const deleted = deleteProperty(propertyId);
    if (deleted) {
      return [200, { message: "Property deleted successfully" }];
    } else {
      return [404, { message: "Property not found" }];
    }
  });

  // Updating property details
  mock.onPut(/\/properties\/\d+/).reply((config) => {
    const propertyId = decodeURIComponent(config.url?.split("/").pop() || "");
    const updatedDetails = JSON.parse(config.data);
    const updatedProperty = updateProperty(propertyId, updatedDetails);
    if (updatedProperty) {
      return [200, { property: updatedProperty }];
    } else {
      return [404, { message: "Property not found" }];
    }
  });
};
