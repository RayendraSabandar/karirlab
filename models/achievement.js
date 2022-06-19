'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Achievement.belongsTo(models.Resume, { foreignKey: 'resume_id' })
      Achievement.belongsTo(models.Occupation, { foreignKey: 'occupation_id' })
    }
  };
  Achievement.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    ResumeId: {
      type: DataTypes.INTEGER,
    },
    OccupationId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Achievement',
  });
  return Achievement;
};