import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import { Users, Posts, Comments, Likes } from "../model/index.js";

const database = {};
const credentials = {
  host: "localhost",
  user: "root",
  password: "",
  database: "bitogram",
};

try {
  const connection = await mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
  });

  await connection.query(
    "CREATE DATABASE IF NOT EXISTS " + credentials.database
  );

  const sequelize = new Sequelize(
    credentials.database,
    credentials.user,
    credentials.password,
    { dialect: "mysql" }
  );

  database.Users = Users(sequelize);
  database.Posts = Posts(sequelize);
  database.Comments = Comments(sequelize);
  database.Likes = Likes(sequelize);

  database.Users.hasMany(database.Posts);
  database.Posts.belongsTo(database.Users);

  database.Users.hasMany(database.Comments);
  database.Comments.belongsTo(database.Users);

  database.Posts.hasMany(database.Comments, {
    onDelete: "CASCADE",
    hooks: true,
  });

  database.Comments.belongsTo(database.Posts);

  database.Posts.hasMany(database.Likes, {
    onDelete: "CASCADE",
    hooks: true,
  });
  database.Likes.belongsTo(database.Posts);
  database.Likes.belongsTo(database.Users);

  await sequelize.sync({ alter: true });
} catch (error) {
  console.log(error);
  console.log("Error connecting to database");
}

export default database;
