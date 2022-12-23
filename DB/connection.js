import { Sequelize } from "sequelize";
export const sequelize = new Sequelize("ass5", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

export const connectDB = async () => {
  return await sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("connectedDB");
    })
    .catch(() => {
      console.log("fail to connected DB");
    });
};
