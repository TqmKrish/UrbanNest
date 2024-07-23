import {
  getProperty,
  getAllProperties,
  getFilteredProperties,
  updateProperty,
  deleteProperty,
  addProperty,
  updateReview
} from "./controller/PropertyAPI";
import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { ifUserExists } from "./controller/userAPI";
import { UserInfo } from "./DB/users";

export const MockAPI = (axiosInstance: AxiosInstance) => {
  let mock = new MockAdapter(axiosInstance);

  mock.onPost("/login").reply((config): any => {
    try {
      const user: UserInfo | undefined = ifUserExists(config.data);
      if (user) {
        return [200, { user, isLoginSuccessful: true }];
      } else {
        return [
          200,
          { message: "Invalid credentials", isLoginSuccessful: false },
        ];
      }
    } catch {
      return [
        500,
        { message: "Unknown Error Occurred", isLoginSuccessful: false },
      ];
    }
  });

  mock.onPost("/sign-up").reply((config): any => {
    return;
  });

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
  mock.onPost("/properties").reply((config: any) => {
    const data = Object.fromEntries(config.data.entries());
    const addedProperty = addProperty(data);
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

  mock.onPut(/\/reviews\/\d+/).reply((config: any): any => {
    const propertyId = decodeURIComponent(config.url?.split("/").pop() || "");
    const review = JSON.parse(config.data);
    const updateReview1: any = updateReview(propertyId, review);
    console.log(review, propertyId);
  });
};
