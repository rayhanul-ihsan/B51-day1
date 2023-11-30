'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projects.init({
    name: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    duration: DataTypes.STRING,
    description: DataTypes.STRING,
    nodejs: DataTypes.BOOLEAN,
    nextjs: DataTypes.BOOLEAN,
    reactjs: DataTypes.BOOLEAN,
    typescript: DataTypes.BOOLEAN,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};