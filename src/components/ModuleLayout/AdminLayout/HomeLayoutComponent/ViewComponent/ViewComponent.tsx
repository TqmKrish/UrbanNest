import React, { useEffect, useState } from "react";
import "./ViewComponent.scss";
import { useNavigate, useParams } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";
import moment from "moment";
import CarouselComponent from "../../../../CommonComponents/Carousel/Carousel";
import axios from "axios";
import { MockAPI } from "../../../../../mockAPI/mockProvider";
import {
  PropertyDetails,
  ReviewDetails,
} from "../../../../../mockAPI/DB/PropertiesForBuy";
import ModalComponent from "../../../CommonComponents/Modal/ModalComponent";

const ViewComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [btnConfig, setBtnConfig] = useState({
    isDeleteBtnVisible: false,
    isSaveBtnVisible: false,
    isCancelBtnVisible: false,
    isCloseBtnVisible: false,
  });
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });
  // const { property } = location.state || ({} as PropertyDetails);
  const [property, setProperty] = useState<PropertyDetails>(
    {} as PropertyDetails
  );
  const axiosInstance = axios.create();
  MockAPI(axiosInstance);

  const handleSave = () => {
    // Handle save action
    setShowModal(false);
  };

  const handleDelete = () => {
    // Handle delete action
    if (id) {
      axiosInstance
        .delete(`/properties/${id}`)
        .then((res) => {
          console.log(res);
          navigate("..");
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const openDeleteModal = () => {
    setBtnConfig({
      isDeleteBtnVisible: true,
      isSaveBtnVisible: false,
      isCancelBtnVisible: true,
      isCloseBtnVisible: false,
    });
    setModalContent({
      title: "Delete Confirmation",
      body: "Are you sure you want to delete this item?",
    });
    setShowModal(true);
  };

  // const openSaveModal = () => {
  //   setBtnConfig({
  //     isDeleteBtnVisible: false,
  //     isSaveBtnVisible: true,
  //     isCancelBtnVisible: true,
  //     isCloseBtnVisible: false,
  //   });
  //   setModalContent({
  //     title: "Save Changes",
  //     body: "Do you want to save the changes you made?",
  //   });
  //   setShowModal(true);
  // };

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/properties/${id}`)
        .then((res) => {
          console.log(res);
          setProperty(res.data.property);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = moment(dateString);
    if (date.isSame(moment(), "day")) {
      return "Today";
    } else if (date.isSame(moment().subtract(1, "day"), "day")) {
      return "Yesterday";
    } else {
      return date.format("DD MMMM");
    }
  };

  const editAd = () => {
    axiosInstance
      .put(`/properties/${id}`, { isFavorite: true })
      .then((res) => {
        console.log(res);
        setProperty(res.data.property);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="row mx-0 w-100 pt-4 pb-20 px-16 view-wrapper">
      <div className="col-sm-12 pb-4 d-flex justify-content-end gap-2">
        <button type="button" className="delete-ad-btn" onClick={editAd}>
          Edit Ad
        </button>
        <button
          type="button"
          className="delete-ad-btn"
          onClick={openDeleteModal}
        >
          Delete Ad
        </button>
        <ModalComponent
          show={showModal}
          onHide={() => setShowModal(false)}
          title={modalContent.title}
          content={modalContent.body}
          btnConfig={btnConfig}
          onSave={handleSave}
          onDelete={handleDelete}
          onCancel={handleCancel}
          onClose={handleClose}
        />
      </div>
      <div className="col-sm-8">
        <div className="left-wrapper">
          <div className="property-image-wrapper">
            <CarouselComponent carouselImages={property?.images} />
          </div>
          <div className="d-flex w-100 flex-column property-detail-wrapper bg-white">
            <h3>Details</h3>
            <div className="d-flex w-100 my-2">
              <div className="col-sm-6 d-flex">
                <div className="col-6 px-0">
                  <p>Type</p>
                  <p>Bedrooms</p>
                  <p>Bathrooms</p>
                  <p>Furnishing</p>
                  <p>Construction Status</p>
                  <p>Listed by</p>
                  <p>Super Builtup area (ft²)</p>
                </div>
                <div className="col-6 px-0">
                  <p>{property?.type}</p>
                  <p>{property?.bedrooms}</p>
                  <p>{property?.bathrooms}</p>
                  <p>{property?.furnishing}</p>
                  <p>{property?.constructionStatus}</p>
                  <p>{property?.listedBy}</p>
                  <p>{property?.superBuiltUpArea}</p>
                </div>
              </div>
              <div className="col-sm-6 px-0 d-flex">
                <div className="col-6 px-0">
                  <p>Carpet Area (ft²)</p>
                  <p>Total Floors</p>
                  <p>Floor No</p>
                  <p>Car Parking</p>
                  <p>Facing</p>
                  <p>Project Name</p>
                </div>
                <div className="col-6 px-0">
                  <p>{property?.carpetArea}</p>
                  <p>{property?.totalFloors}</p>
                  <p>{property?.floorNo}</p>
                  <p>{property?.carParking}</p>
                  <p>{property?.facing}</p>
                  <p>{property?.projectName}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="d-flex flex-column w-100">
              <h3>Description</h3>
              {property?.description}
            </div>
          </div>
          <div className=" d-flex w-100 flex-column reviews-wrapper card-details bg-white">
            <h3>Reviews</h3>
            <div className="d-flex align-items-center justify-start">
              <label htmlFor="review" className="w-100">
                Add a Review
              </label>
              <input
                name="review"
                placeholder="Add a review"
                type="text"
                className="w-100"
              />
            </div>
            <div className="reviews-container">
              {property?.reviews?.map((review: ReviewDetails) => (
                <div className="review-card" key={review?.id}>
                  <div className="review-header">
                    <img
                      src={review?.image}
                      width={50}
                      height={50}
                      className="reviewer-image"
                      alt="reviewer"
                    />
                    <div className="reviewer-info">
                      <div className="reviewer-name-rating">
                        <span className="reviewer-name">
                          {review?.reviewerName}
                        </span>
                        <div className="review-rating">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={
                                i < review?.rating ? "star filled" : "star"
                              }
                            >
                              &#9733;
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="review-date">{review?.dateTime}</span>
                    </div>
                  </div>
                  <div className="review-body">
                    <div className="review-description">
                      {review?.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="right-wrapper">
          <div className="p-3 card-details d-flex flex-column bg-white mb-2">
            <div className="d-flex justify-between mb-2">
              <span className="d-flex align-items-center">
                <FaRupeeSign />
                <span className="price">{property?.price}</span>
              </span>
              <span className="d-flex align-items-center gap-2">
                <IoShareSocialOutline />
                <FaRegHeart />
              </span>
            </div>
            <span className="bhk font-normal text-gray-700 dark:text-gray-400">
              {`${property?.bedrooms}Bhk - ${property?.bathrooms}Ba - ${property?.superBuiltUpArea} ft²`}
            </span>
            <span className="title font-normal text-gray-700 dark:text-gray-400">
              {property?.title}
            </span>
            <span className="location-date d-flex justify-between">
              <span>{property?.location}</span>
              <span>{formatDate(property?.postedDate)}</span>
            </span>
          </div>
          <div className="p-3 card-details d-flex flex-column bg-white mb-2">
            <div className="d-flex align-items-center gap-3">
              <img
                className="seller-profile-pic"
                src={property?.sellerDetails?.profilePicture}
                alt="profile-pic-seller"
              />
              <h3 className="mb-0">{property?.sellerDetails?.fullName}</h3>
              <FaChevronRight className="ms-auto" />
            </div>
            <button type="button" className="btn chat-with-seller-btn">
              Chat with seller
            </button>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <IoCallOutline />
              <span>**********</span>
              <a>Show Number</a>
            </div>
          </div>
          <div className="p-3 card-details d-flex flex-column bg-white mb-2">
            <h4>Posted In</h4>
            <span>{property?.location}</span>
          </div>
          <div className="p-3 card-details d-flex flex-column bg-white mb-2">
            <iframe
              key="map"
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
              width={"100%"}
              height="450"
              style={{ border: 0 }}
              aria-hidden="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComponent;
