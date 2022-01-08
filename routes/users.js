import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [];

// all routes in here are starting with /users

router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  const user = req.body;
  if (user.firstName && user.lastName && user.age) {
    users.push({ ...user, id: uuidv4() });
    res.send(
      `User with the name ${user.firstName} added to the database Successfully!`
    );
  } else {
    res.send(`:( Operation failed while adding user to database!`);
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const userFound = users.find((user) => user.id === id);
  if (userFound) {
    res.send(userFound);
  } else {
    res.send(`This user id ${id} does not exist`);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const userFound = users.find((user) => user.id === id);
  if (userFound) {
    users = users.filter((user) => user.id !== id);
    res.send(`User with the id ${id} deleted from the database successfully`);
  } else {
    res.send(`This user id ${id} does not exist`);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  const user = users.find((user) => user.id === id);
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;

  res.send(`User with the id ${id} has been updated`);
});

export default router;
