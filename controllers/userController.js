const { getUser, createUser } = require('../services/userService');

const fetchUser = async (req, res) => {
  try {
    const data = req.query;
    const { body } = req;
    const result = await getUser(data, body);
    res.status(result.status).json({
      status: result.status,
      message: result.message,
      page: result.page,
      pageSize: result.pageSize,
      total: result.total,
      totalPages: result.totalPages,
      users: result.users,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const postUser = async (req, res) => {
  try {
    const data = req.body;
    const result = await createUser(data);
    res.status(result.status).json({
      status: result.status,
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  fetchUser,
  postUser,
};
