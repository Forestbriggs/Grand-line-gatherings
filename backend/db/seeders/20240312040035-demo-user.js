'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await User.bulkCreate([
            {
                firstName: 'demo',
                lastName: 'user',
                username: 'Demo-lition',
                email: 'demo@user.io',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                firstName: 'fake',
                lastName: 'user',
                username: 'FakeUser1',
                email: 'user1@user.io',
                hashedPassword: bcrypt.hashSync('password2')
            },
            {
                firstName: 'also',
                lastName: 'fake',
                username: 'FakeUser2',
                email: 'user2@user.io',
                hashedPassword: bcrypt.hashSync('password3')
            }
        ], { validate: true });
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'Users';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            username: {
                [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2']
            }
        }, {})
    }
};
