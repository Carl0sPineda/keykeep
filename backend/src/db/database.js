import Sequelize from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "keykeep.sqlite",
});

const Key = sequelize.define(
  "key",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    website: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

sequelize.sync();

export default Key;
