import { getProperty, getAllProperties, getFilteredProperties } from "./controller/PropertyAPI";
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
};
