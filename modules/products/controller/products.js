import { productModel } from "../../../models/product.js";
import { Op } from "Sequelize";
import { userModel } from "../../../models/user.js";

export const add = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.json({ message: "Done", product });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const allProducts = async (req, res) => {
  try {
    const products = await productModel.findAll({
      include: {
        model: userModel,
      },
    });
    if (products.length) {
      res.json({ message: "Done", products });
    } else {
      res.json({ message: "Don't have any products in system" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findOne({
      include: {
        model: userModel,
      },
      where: { id },
    });
    if (product) {
      res.json({ message: "Done", product });
    } else {
      res.json({ message: "invalid product" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const product = await productModel.update(req.body, {
      where: { id, userId },
    });
    if (product[0]) {
      res.json({ message: "Done", product });
    } else {
      res.json({ message: "you can't update this product" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const product = await productModel.destroy({
      where: { id, userId },
    });
    if (product) {
      res.json({ message: "Done", product });
    } else {
      res.json({ message: "you can't delete this product" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { price } = req.query;
    const products = await productModel.findAll({
      include: {
        model: userModel,
      },
      where: { price: { [Op.lt]: price } },
    });
    if (products.length) {
      res.json({ message: "Done", products });
    } else {
      res.json({ message: "Don't have any products in system" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const getProducts2 = async (req, res) => {
  try {
    const { GT, LT } = req.query;
    const products = await productModel.findAll({
      include: {
        model: userModel,
      },
      where: {
        [Op.and]: {
          price: { [Op.gte]: GT },
          price: { [Op.lte]: LT },
        },
      },
    });
    if (products.length) {
      res.json({ message: "Done", products });
    } else {
      res.json({ message: "Don't have any products in system" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const getProducts3 = async (req, res) => {
  try {
    const { key } = req.query;
    const products = await productModel.findAll({
      include: {
        model: userModel,
      },
      where: { title: { [Op.like]: `%${key}%` } },
    });
    if (products.length) {
      res.json({ message: "Done", products });
    } else {
      res.json({ message: "Don't have any products in system" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
