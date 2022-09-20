import { DataTypes } from "sequelize";

const Posts = (sequelize) => {
  const Schema = {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };

  return sequelize.define("posts", Schema);
};

export default Posts;
