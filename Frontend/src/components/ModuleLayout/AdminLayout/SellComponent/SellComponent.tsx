import React, { useState } from "react";
import axios from "axios";
import { MockAPI } from "../../../../mockAPI/mockProvider";
import { useNavigate } from "react-router-dom";
import axiosInterceptor from "../../../../Interceptor/axiosInterceptor";

interface PropertyFormValues {
  title: string;
  description: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  furnishing: string;
  constructionStatus: string;
  superBuiltUpArea: number;
  carpetArea: number;
  totalFloors: number;
  floorNo: number;
  carParking: number;
  facing: string;
  projectName: string;
  price: number;
  location: string;
  images: File[];
}

const initialFormValues: PropertyFormValues = {
  title: "",
  description: "",
  type: "",
  bedrooms: 0,
  bathrooms: 0,
  furnishing: "",
  constructionStatus: "",
  superBuiltUpArea: 0,
  carpetArea: 0,
  totalFloors: 0,
  floorNo: 0,
  carParking: 0,
  facing: "",
  projectName: "",
  price: 0,
  location: "",
  images: [],
};

const SellComponent: React.FC = () => {
  const [formValues, setFormValues] =
    useState<PropertyFormValues>(initialFormValues);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    [key in keyof PropertyFormValues]?: string;
  }>({});
  const axiosInstance = axios.create();
  MockAPI(axiosInstance);
  const navigate = useNavigate();

  const formFields = [
    { name: "title", label: "Title", placeholder: "Enter title" },
    { name: "type", label: "Type", placeholder: "Enter property type" },
    {
      name: "bedrooms",
      label: "Bedrooms",
      placeholder: "Number of bedrooms",
    },
    {
      name: "bathrooms",
      label: "Bathrooms",
      placeholder: "Number of bathrooms",
    },
    {
      name: "furnishing",
      label: "Furnishing",
      placeholder: "Enter furnishing details",
    },
    {
      name: "constructionStatus",
      label: "Construction Status",
      placeholder: "Enter construction status",
    },
    {
      name: "superBuiltUpArea",
      label: "Super Built-Up Area",
      placeholder: "Enter super built-up area",
    },
    {
      name: "carpetArea",
      label: "Carpet Area",
      placeholder: "Enter carpet area",
    },
    {
      name: "totalFloors",
      label: "Total Floors",
      placeholder: "Enter total number of floors",
    },
    {
      name: "floorNo",
      label: "Floor No",
      placeholder: "Enter floor number",
    },
    {
      name: "carParking",
      label: "Car Parking",
      placeholder: "Enter car parking details",
    },
    {
      name: "facing",
      label: "Facing",
      placeholder: "Enter facing direction",
    },
    {
      name: "projectName",
      label: "Project Name",
      placeholder: "Enter project name",
    },
    { name: "price", label: "Price", placeholder: "Enter price" },
    {
      name: "location",
      label: "Location",
      placeholder: "Enter location",
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Enter description",
    },
  ];

  const validate = () => {
    const newErrors: { [key in keyof PropertyFormValues]?: string } = {};
    Object.keys(formValues).forEach((key) => {
      if (key !== "images" && !formValues[key as keyof PropertyFormValues]) {
        newErrors[key as keyof PropertyFormValues] = "Required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]:
        name === "bedrooms" ||
        name === "bathrooms" ||
        name === "superBuiltUpArea" ||
        name === "carpetArea" ||
        name === "totalFloors" ||
        name === "floorNo" ||
        name === "carParking" ||
        name === "price"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormValues((prevValues) => ({
      ...prevValues,
      images: files,
    }));
    setUploadedImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const formData = new FormData();
      Object.keys(formValues).forEach((key) => {
        if (key === "images") {
          formValues.images.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
          });
        } else {
          formData.append(key, (formValues as any)[key]);
        }
      });

      formData.append(
        "sellerId",
        JSON.parse(localStorage.getItem("userDetails") ?? "")?.id
      );

      axiosInterceptor
        .post("http://localhost:5000/api/property/sell", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response: any) => {
          console.log(response);
          alert("Property listed for sale..")
          navigate("../buy");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {formFields.map((field, index) => (
          <div key={index} className="flex flex-col">
            <label htmlFor={field.name} className="font-medium text-gray-700">
              {field.label}
            </label>
            {field.name !== "description" ? (
              <input
                id={field.name}
                name={field.name}
                type={
                  field.name === "bedrooms" ||
                  field.name === "bathrooms" ||
                  field.name === "superBuiltUpArea" ||
                  field.name === "carpetArea" ||
                  field.name === "totalFloors" ||
                  field.name === "floorNo" ||
                  field.name === "carParking" ||
                  field.name === "price"
                    ? "number"
                    : "text"
                }
                value={(formValues as any)[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <textarea
                id={field.name}
                name={field.name}
                rows={5}
                value={(formValues as any)[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              ></textarea>
            )}
            {errors[field.name as keyof PropertyFormValues] && (
              <span className="text-red-600 text-sm">
                {errors[field.name as keyof PropertyFormValues]}
              </span>
            )}
          </div>
        ))}
      </div>
      <div>
        <label className="font-medium text-gray-700">Upload Images</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {uploadedImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Uploaded ${index + 1}`}
              className="object-cover w-full h-40 rounded-md"
            />
          </div>
        ))}
      </div>
      <div className="d-flex">
        <button
          type="submit"
          className="w-25 py-2 px-4 text-white font-semibold rounded-md m-auto"
          style={{ background: "rgb(79, 70, 229)" }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SellComponent;
