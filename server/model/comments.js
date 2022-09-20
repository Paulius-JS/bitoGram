import { DataTypes } from "sequelize";

const Comments = (sequelize) => {
  const Schema = {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  };

  return sequelize.define("comments", Schema);
};

export default Comments;
