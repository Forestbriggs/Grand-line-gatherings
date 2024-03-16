'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Image.init({
        imageableId: {
            type: DataTypes.INTEGER,
        },
        imageableType: {
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
        },
        preview: {
            type: DataTypes.BOOLEAN
        },
    }, {
        sequelize,
        modelName: 'Image',
    });
    return Image;
};