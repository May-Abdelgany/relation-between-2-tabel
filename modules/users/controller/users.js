import { userModel } from "../../../models/user.js";
import { Op } from "Sequelize";
import { productModel } from './../../../models/product.js';
export const allUsers = async (req, res) => {
  try {
    const users = await userModel.findAll({
      include:{
        model:productModel
      }
    });
    if (users.length) {
      res.json({ message: "Done", users });
    } else {
      res.json({ message: "Don't have users in system" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, age, phone } = req.body;
    const user = await userModel.create({
      email,
      password,
      firstName,
      lastName,
      age,
      phone,
    });
    res.json({ message: "Done", user });
  } catch (error) {
    if (error?.parent?.errno == 1062) {
      res.json({ message: "email is exist in system" });
    } else {
      res.json({ message: "catch error", error });
    }
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      attributes: ["id", "email", "firstName", "lastName", "age", "phone"],
      where: {
        email,
        password,
      },
    });
    if (user) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "Email or password not matched" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.update(req.body, {
      where: { id },
    });
    if (user[0]) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "invalid account" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({
      include:{
        model:productModel
      },
      where: { id },
    });
    if (user) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "invalid account" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.destroy({
      where: { id },
    });
    if (user) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "invalid account" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const users = async (req, res) => {
  try {
    const { key } = req.query;
    const users = await userModel.findAll({
      where: {
        firstName: {
          [Op.like]: `${key}%`,
        },
      },
    });
    if (users.length) {
      res.json({ message: "Done", users });
    } else {
      res.json({
        message: `Don't have users with first name start with ${key}`,
      });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const users2 = async (req, res) => {
  try {
    const { key } = req.query;
    const users = await userModel.findAll({
      where: {
        age: {
          [Op.gt]: `${key}%`,
        },
      },
    });
    if (users.length) {
      res.json({ message: "Done", users });
    } else {
      res.json({
        message: `Don't have users with age > ${key}`,
      });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const users3 = async (req, res) => {
  try {
    const { key1, key2 } = req.query;
    const users = await userModel.findAll({
      where: {
        [Op.and]: {
          firstName: {
            [Op.like]: `${key1}%`,
          },
          age: {
            [Op.gt]: `${key2}%`,
          },
        },
      },
    });
    if (users.length) {
      res.json({ message: "Done", users });
    } else {
      res.json({
        message: `Don't have users with age > ${key2} and first name start with ${key1}`,
      });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const users4 = async (req, res) => {
  try {
    const { key } = req.query;
    const users = await userModel.findAll({
      where: {
        [Op.or]: {
          firstName: {
            [Op.like]: `${key}%`,
          },
          lastName: {
            [Op.like]: `${key}%`,
          },
        },
      },
    });
    if (users.length) {
      res.json({ message: "Done", users });
    } else {
      res.json({
        message: `Don't have users have first name start with ${key} or last name start with ${key}`,
      });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
