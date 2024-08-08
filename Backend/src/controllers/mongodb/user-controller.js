const { User, Admin } = require("../../models/mongo/User/user-model");

const handleGetAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  return res.status(200).json({ data: allUsers, isActionSuccessful: true });
};

const handleCreateNewUser = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    contactNumber,
    address,
    profilePicture,
    bio,
    certifications,
    propertiesListed,
    rating,
    socialLinks,
    preferredContactMethod,
  } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    role: "USER",
    contactNumber,
    address,
    profilePicture,
    bio,
    certifications,
    propertiesListed,
    rating,
    socialLinks,
    preferredContactMethod,
  });

  return res.status(200).json({ data: user, isActionSuccessful: true });
};

const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.status(200).json({ data: user, isActionSuccessful: true });
};

const handleUpdateUserById = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {}); //update info here
  return res.status(200).json({ data: user, isActionSuccessful: true });
};

const handleDeleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id); //update info here
  return res.status(200).json({ isActionSuccessful: true });
};

// Admin functions

const handleGetAllAdmins = async (req, res) => {
  const allAdmins = await Admin.find({});
  return res.status(200).json({ data: allAdmins, isActionSuccessful: true });
};

const handleCreateNewAdmin = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    contactNumber,
    address,
    profilePicture,
    bio,
    certifications,
    propertiesListed,
    rating,
    socialLinks,
    preferredContactMethod,
  } = req.body;

  const admin = await Admin.create({
    firstName,
    lastName,
    username,
    email,
    contactNumber,
    address,
    profilePicture,
    bio,
    certifications,
    propertiesListed,
    rating,
    socialLinks,
    role: "ADMIN",
    preferredContactMethod,
  });

  return res.status(200).json({ data: admin, isActionSuccessful: true });
};

const handleGetAdminById = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  return res.status(200).json({ data: admin, isActionSuccessful: true });
};

const handleUpdateAdminById = async (req, res) => {
  const admin = await Admin.findByIdAndUpdate(req.params.id, {}); //update info here
  return res.status(200).json({ data: admin, isActionSuccessful: true });
};

const handleDeleteAdminById = async (req, res) => {
  await Admin.findByIdAndDelete(req.params.id); //update info here
  return res.status(200).json({ isActionSuccessful: true });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
  handleGetAllAdmins,
  handleGetAdminById,
  handleUpdateAdminById,
  handleDeleteAdminById,
  handleCreateNewAdmin,
};
