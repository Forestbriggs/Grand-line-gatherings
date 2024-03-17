'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Group, Image } = require('../models');

const groupImages = [
    {
        name: 'Straw Hat Pirates',
        images: [
            {
                url: 'https://beebom.com/wp-content/uploads/2023/01/straw-hats.jpg',
                preview: true
            }
        ]
    }
]

module.exports = {
    async up(queryInterface, Sequelize) {
        for (let info of groupImages) {
            const { name, images } = info;
            const group = await Group.findOne({ where: { name } });

            for (let image of images) {
                await group.createImage({ ...image, imageableId: group.id });
            }
        }
    },

    async down(queryInterface, Sequelize) {
        for (let info of groupImages) {
            const { name, images } = info;
            const group = await Group.findOne({ where: { name } });

            for (let image of images) {
                await group.destroy({
                    where: {
                        ...image, imageableId: group.id
                    }
                });
            }
        }
    }
};
