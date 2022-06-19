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
      Achievement.belongsTo(models.Resume, { foreignKey: 'resume_id', as: 'achievements', onDelete: 'cascade', onUpdate: 'cascade' })
      Achievement.belongsTo(models.Occupation, { foreignKey: 'occupation_id', as: 'occupation_achievements', onDelete: 'cascade', onUpdate: 'cascade' })
    }
  };
  Achievement.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    resume_id: {
      type: DataTypes.INTEGER,
    },
    occupation_id: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Achievement',
  });
  return Achievement;
};