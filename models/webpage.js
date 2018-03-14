'use strict';
module.exports = (sequelize, DataTypes) => {
  const Webpage = sequelize.define('Webpage', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {});
  Webpage.associate = (models) => {
    // associations can be defined here
  };
  return Webpage;
};
