'use strict';
module.exports = (sequelize, DataTypes) => {
  const Features = sequelize.define('Features', {
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    camera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chipset: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ram: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Battery: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Features.associate = (models) => {
    // associations can be defined here
    const {
      Webpage,
      Brand,
    } = models;

    Features.belongsTo(Brand, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    Features.belongsToMany(Webpage, {
     through: 'webpagePhone',
    });
  };

  return Features;
};
