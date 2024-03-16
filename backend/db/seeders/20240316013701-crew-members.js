'use strict';

const { Group, User } = require('../models');
const bcrypt = require('bcryptjs');

const crewsAndMembers = [
    {
        name: 'Straw Hat Pirates',
        crewMembers: [
            {
                firstName: 'Roronoa',
                lastName: 'Zoro',
                username: 'ThreeSwordsZoro',
                email: 'zoro@strawhats.com',
                hashedPassword: bcrypt.hashSync('Str0ng3stSw0rdsman!!')
            },
            {
                firstName: 'Nami',
                lastName: 'Orange',
                username: 'NavigatorNami',
                email: 'nami@strawhats.com',
                hashedPassword: bcrypt.hashSync('W3atherMaster!')
            },
            {
                firstName: 'Usopp',
                lastName: 'Yasopp',
                username: 'Sogeking',
                email: 'usopp@strawhats.com',
                hashedPassword: bcrypt.hashSync('Br@veWarr!orUsopp')
            },
            {
                firstName: 'Vinsmoke',
                lastName: 'Sanji',
                username: 'BlackLegSanji',
                email: 'sanji@strawhats.com',
                hashedPassword: bcrypt.hashSync('AllBlu3Dream!ng')
            },
            {
                firstName: 'TonyTony',
                lastName: 'Chopper',
                username: 'DoctorChopper',
                email: 'chopper@strawhats.com',
                hashedPassword: bcrypt.hashSync('Re1nd33r')
            },
            {
                firstName: 'Nico',
                lastName: 'Robin',
                username: 'ArchaeologistRobin',
                email: 'robin@strawhats.com',
                hashedPassword: bcrypt.hashSync('0haraScho!ar')
            },
            {
                firstName: 'Cutty',
                lastName: 'Flam',
                username: 'Franky',
                email: 'franky@strawhats.com',
                hashedPassword: bcrypt.hashSync('SuperC0la!01')
            },
            {
                firstName: 'Brook',
                lastName: 'Yohoho',
                username: 'SoulKingBrook',
                email: 'brook@strawhats.com',
                hashedPassword: bcrypt.hashSync('Y0h0ho!!!')
            },
            {
                firstName: 'Jinbe',
                lastName: 'Tiger',
                username: 'FishmanJinbe',
                email: 'jinbe@strawhats.com',
                hashedPassword: bcrypt.hashSync('SeaW@rr!or')
            },
        ]
    },
    {
        name: 'Heart Pirates',
        crewMembers: [
            {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                hashedPassword: bcrypt.hashSync('')
            },
        ]
    },
    {
        name: 'Donquixote Pirates',
        crewMembers: [
            {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                hashedPassword: bcrypt.hashSync('')
            },
        ]
    },
    {
        name: 'Marine',
        crewMembers: [
            {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                hashedPassword: bcrypt.hashSync('')
            },
        ]
    },
    {
        name: 'The Revolutionary Army',
        crewMembers: [
            {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                hashedPassword: bcrypt.hashSync('')
            },
        ]
    },
    {
        name: 'Straw Hat Grand Fleet',
        crewMembers: [
            {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                hashedPassword: bcrypt.hashSync('')
            },
        ]
    }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
