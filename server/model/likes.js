import { DataTypes } from "sequelize";

const Liked = (sequelize) => {
  const Schema = {};

  return sequelize.define("likes", Schema);
};

export default Liked;
