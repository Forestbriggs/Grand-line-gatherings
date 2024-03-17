'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        getImageable(options) {
            if (!this.imageableType) return Promise.resolve(null);
            const mixInMethodName = `get${this.imageableType}`;
            return this[mixInMethodName](options);
        }

        static associate(models) {
            Image.belongsTo(models.Group,
                {
                    foreignKey: "imageableId",
                    constraints: false
                });
        }
    }
    Image.init({
        imageableId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imageableType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Group', 'Event']]
            }
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        preview: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Image',
        hooks: {
            afterFind: result => {
                if (result === null) return;
                if (!Array.isArray(result)) result = [result];
                for (const instance of result) {
                    if (instance.imageableType === 'Group' && instance.Group !== undefined) {
                        instance.dataValues.imageable = instance.Group.dataValues;
                        instance.imageable = instance.Group;
                    } else if (instance.imageableType === 'Event' && instance.Event !== undefined) {
                        instance.dataValues.imageableType = instance.Event.dataValues;
                        instance.imageable = instance.Event;
                    } else {
                        instance.imageable = null;
                    }
                    //? To prevent mistakes
                    delete instance.Group;
                    delete instance.dataValues.Group;
                    delete instance.Event;
                    delete instance.dataValues.Event;
                }
            }
        }
    });
    return Image;
};