const User = require('../models/userModel');

// Create a new user
async function createUser(data) {
  try {
    const {
      userFirstName, userLastName, userEmail, userPhone, userAddress, userCity, userState,
      userZip, userCountry, userGender, userDob, userRole, userStatus,
    } = data;
    const user = new User({
      userFirstName,
      userLastName,
      userEmail,
      userPhone,
      userAddress,
      userCity,
      userState,
      userZip,
      userCountry,
      userGender,
      userDob,
      userRole,
      userStatus,
    });
    await user.save();
    return {
      status: 200,
      message: 'User created successfully',
      user,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
}

async function getUser(data) {
  try {
    const {
      userFirstName, userLastName, userEmail, userPhone, userAddress, userCity, course,
      userState, userZip, userCountry, userGender, userDob, userRole, userStatus,
      page = 1, pageSize = 10,
    } = data;
    let { filters } = data || {};
    const query = {};
    if (userFirstName) query.userFirstName = { $regex: userFirstName, $options: 'i' };
    if (userLastName) query.userLastName = { $regex: userLastName, $options: 'i' };
    if (userEmail) query.userEmail = userEmail;
    if (userPhone) query.userPhone = userPhone;
    if (userAddress) query.userAddress = { $regex: userAddress, $options: 'i' };
    if (userCity) query.userCity = { $regex: userCity, $options: 'i' };
    if (userState) query.userState = { $regex: userState, $options: 'i' };
    if (userZip) query.userZip = userZip;
    if (userCountry) query.userCountry = { $regex: userCountry, $options: 'i' };
    if (userGender) query.userGender = userGender;
    if (userDob) query.userDob = new Date(userDob);
    if (userRole) query.userRole = userRole;
    if (userStatus) query.userStatus = userStatus;
    if (course) query.course = course;
    const sort = {};

    filters = (filters && JSON.parse(filters)) || {};

    Object.keys(filters).forEach((key) => {
      sort[key] = filters[key] === 'ascending' ? 1 : -1;
    });

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .sort(sort)
      .limit(parseInt(pageSize, 10))
      .skip((page - 1) * parseInt(pageSize, 10));

    return {
      status: 200,
      message: 'Users fetched successfully',
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      users,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message,
    };
  }
}

module.exports = { createUser, getUser };
