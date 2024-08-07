const User = require("../../models/mongo/User/user-model");

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
    socialLinks,
    preferredContactMethod,
    bio,
    certifications,
    propertiesListed,
    rating,
  } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    contactNumber,
    address,
    profilePicture,
    socialLinks,
    preferredContactMethod,
    bio,
    certifications,
    propertiesListed,
    rating,
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
  const user = await User.findByIdAndDelete(req.params.id); //update info here
  return res.status(200).json({ isActionSuccessful: true });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
