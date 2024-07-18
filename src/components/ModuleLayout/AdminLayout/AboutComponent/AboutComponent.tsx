import React, { useState, ChangeEvent, useRef } from "react";
import "./AboutComponent.scss";

interface FormData {
  title: string;
  description: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  location: string;
  type: string;
  facilities: string;
  images: File[];
}

const AboutComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    type: "",
    facilities: "",
    images: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData({ ...formData, images: filesArray });

      const previewArray = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previewArray);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.price || isNaN(Number(formData.price)))
      newErrors.price = "Valid price is required";
    if (!formData.bedrooms || isNaN(Number(formData.bedrooms)))
      newErrors.bedrooms = "Valid number of bedrooms is required";
    if (!formData.bathrooms || isNaN(Number(formData.bathrooms)))
      newErrors.bathrooms = "Valid number of bathrooms is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.facilities) newErrors.facilities = "Facilities are required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Handle form submission
      console.log("Form Data:", formData);
    }
  };

  return (
    <div className="sell-property-form-container">
      <div className="sell-property-form">
        <h2>Sell Your Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <p className="error-message">{errors.title}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <p className="error-message">{errors.price}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="bedrooms">Bedrooms</label>
              <input
                type="text"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
              />
              {errors.bedrooms && (
                <p className="error-message">{errors.bedrooms}</p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms</label>
              <input
                type="text"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
              />
              {errors.bathrooms && (
                <p className="error-message">{errors.bathrooms}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && (
                <p className="error-message">{errors.location}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
              </select>
              {errors.type && <p className="error-message">{errors.type}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="error-message">{errors.description}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="facilities">Facilities</label>
              <textarea
                id="facilities"
                name="facilities"
                value={formData.facilities}
                onChange={handleChange}
              />
              {errors.facilities && (
                <p className="error-message">{errors.facilities}</p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="images">Upload Images</label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                className="image-upload"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <label htmlFor="images" className="image-upload-label">
                Select Images
              </label>
            </div>

            <div className="image-preview-container">
              {previewImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`preview ${index}`}
                  className="image-preview"
                />
              ))}
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutComponent;
