//* /backend/utils/groups.js
const { Group, User, sequelize } = require('../db/models');

const getAllGroups = async (req, res) => {
    let groups = await Group.findAll();

    //TODO create Images table to hold group images
    await Promise.all(groups.map(async (group) => {
        group.dataValues.numMembers = await group.countUsers() + 1;
        group.dataValues.previewImage = '/some/url'

        return group;
    }));

    res.json({ Groups: groups })
};

module.exports = {
    getAllGroups,
}