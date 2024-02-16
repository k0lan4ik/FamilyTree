const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Tree = sequelize.define("tree", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Persone = sequelize.define("persone", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstname: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING, allowNull: false },
  user: { type: DataTypes.INTEGER, allowNull: false },
  gender: { type: DataTypes.STRING },
  parent: { type: DataTypes.INTEGER },
});

const PersoneInfo = sequelize.define("persone_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  personeId: { type: DataTypes.INTEGER },
});

const TreePersone = sequelize.define("tree_persone", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Tree);
Tree.belongsTo(User);

Persone.hasMany(PersoneInfo, { as: "info" });
PersoneInfo.belongsTo(Persone);

Tree.belongsToMany(Persone, { through: TreePersone });
Persone.belongsToMany(Tree, { through: TreePersone });

module.exports = {
  User,
  Tree,
  Persone,
  PersoneInfo,
  TreePersone,
};
