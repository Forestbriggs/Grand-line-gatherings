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
                firstName: "Monkey",
                lastName: "Luffy",
                username: "PirateKing",
                email: "luffy@strawhats.com",
                hashedPassword: bcrypt.hashSync("1mgonnabeKingofthePirates!!")
            },
            {
                firstName: "Trafalgar",
                lastName: "Law",
                username: "SurgeonOfHearts",
                email: "trafalgar@heart.com",
                hashedPassword: bcrypt.hashSync("R1PCorazon:(")
            },
            {
                firstName: "Donquixote",
                lastName: "Doflamingo",
                username: "PuppetMaster",
                email: "doflamingo@donquixote.com",
                hashedPassword: bcrypt.hashSync("Str1ngEmp!re")
            },
            {
                firstName: "Sakazuki",
                lastName: "Akainu",
                username: "FleetAdmiral101",
                email: "akainu@marines.com",
                hashedPassword: bcrypt.hashSync("Abs0luteJust!ce")
            },
            {
                firstName: "Monkey",
                lastName: "Dragon",
                username: "FreedomFighterDragon",
                email: "dragon@revolutionists.com",
                hashedPassword: bcrypt.hashSync("Rev0lut!onNow")
            }
        ], { validate: true })
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'Users';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            username: {
                [Op.in]: ['PirateKing', 'SurgeonOfHearts', 'PuppetMaster', "FleetAdmiral101", "FreedomFighterDragon"]
            }
        }, {})
    }
};
