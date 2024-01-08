import users from "../models/user.model.js";

export function httpGetUser(req, res) {
  const userReq = req.body;

  if (!userReq.name) {
    return res.status(400).json({
        error: 'Missing required user name'
    });
  }

  if (!userReq.password) {
    return res.status(400).json({
        error: 'Missing required user password'
    });
  }

  const foundedUser = users.find(user => user.name === userReq.name && user.password === userReq.password);
  if (!foundedUser) {
      return res.status(404).json({ message: `User not found` });
  }
  return res.status(200).json(foundedUser);
}
export function httpCreateUser(req, res) {
  const user = req.body;

  if (!user.name) {
      return res.status(400).json({
          error: 'Missing required user name'
      });
  }

  if (!user.password) {
    return res.status(400).json({
        error: 'Missing required user password'
    });
  }

  user.id = users.length + 1;
  users.push(user);
  return res.status(200).json(user);
}


