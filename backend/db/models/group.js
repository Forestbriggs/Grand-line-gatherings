'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Group.belongsTo(models.User, {
                foreignKey: 'organizerId',
                onDelete: 'CASCADE'
            })
        }
    }
    Group.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [0, 60]
            }
        },
        about: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [50, 255]
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Online', 'In person']]
            }
        },
        private: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 2]
            }
        },
        organizerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Group',
    });
    return Group;
};