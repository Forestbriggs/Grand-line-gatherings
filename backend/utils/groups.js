//* /backend/utils/groups.js
const { Group, User, sequelize } = require('../db/models');

const getAllGroups = async (req, res) => {
    const groups = await Group.findAll();

    //TODO create GroupMembers table and seed with data
    //TODO create Images table to hold group images
    groups.map((group) => {
        group.dataValues.numMembers = 1;
        group.dataValues.previewImage = '/some/url'

        return group;
    });

    res.json({ Groups: groups })
};

module.exports = {
    getAllGroups,
}