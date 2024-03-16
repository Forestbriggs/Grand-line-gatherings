'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GroupMember extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    GroupMember.init({
        memberId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['co-host', 'member', 'pending']]
            }
        },
    }, {
        sequelize,
        modelName: 'GroupMember',
    });
    return GroupMember;
};