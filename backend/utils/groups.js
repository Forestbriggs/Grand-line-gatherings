//* /backend/utils/groups.js
const { Group, User, GroupMember, Image, sequelize } = require('../db/models');


//* Route Functions ------------------------------------------------------------
const getAllGroups = async (req, res, next) => {
    let groups = await Group.findAll({
        include: [
            {
                model: Image,
                where: {
                    preview: true
                },
                required: false
            }
        ]
    });

    await Promise.all(groups.map(async (group) => {
        group.dataValues.numMembers = await group.countUsers() + 1;
        group.dataValues.previewImage = group.dataValues.Images[0]?.url || null;
        delete group.dataValues.Images;

        return group;
    }));

    res.json({ Groups: groups })
};

const getCurrentUserGroups = async (req, res, next) => {
    const id = req.user.id;

    const orgGroups = await Group.findAll({
        where: {
            organizerId: id
        },
        include: [
            {
                model: Image,
                where: {
                    preview: true
                },
                required: false
            }
        ]
    });

    const joinedGroups = await Group.findAll({
        include: [
            {
                model: GroupMember,
                attributes: [],
                where: {
                    memberId: id
                }
            },
            {
                model: Image,
                where: {
                    preview: true
                },
                required: false
            }
        ]
    })

    let groups = orgGroups.concat(joinedGroups);

    groups = await Promise.all(groups.map(async (group) => {
        group.dataValues.numMembers = await group.countUsers() + 1;
        group.dataValues.previewImage = group.dataValues.Images[0]?.url || null;
        delete group.dataValues.Images;

        return group
    }));

    res.json({
        Groups: groups
    });
};

const getGroupById = async (req, res, next) => {
    const { groupId } = req.params;

    const group = await Group.findByPk(groupId, {
        include: [
            {
                model: Image,
                attributes: ['id', 'url', 'preview']
            }
        ]
    });

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.title = "Couldn't find a Group with the specified id";
        // err.errors = { message: "Group couldn't be found" };
        err.status = 404;
        return next(err);
    }

    group.dataValues.numMembers = await group.countUsers() + 1;

    group.dataValues.GroupImages = group.dataValues.Images;
    delete group.dataValues.Images

    group.dataValues.Organizer = await User.unscoped().findByPk(group.dataValues.organizerId, {
        attributes: ['id', 'firstName', 'lastName']
    });

    //TODO add venues once Venue model and seeders created

    res.json(group)
};

const createGroup = async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body;
    const organizerId = req.user.id;

    const group = await Group.create({
        name,
        about,
        type,
        private,
        city,
        state,
        organizerId
    });

    return res.status(201).json(group);
};

module.exports = {
    getAllGroups,
    getCurrentUserGroups,
    getGroupById,
    createGroup
}