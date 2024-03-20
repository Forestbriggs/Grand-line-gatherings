//* /backend/utils/groups.js
const { Group, User, GroupMember, Image, Venue } = require('../db/models');


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

    return res.json({ Groups: groups })
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

    return res.json({
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
            },
            {
                model: Venue,
                attributes: ['id', 'address', 'city', 'state', 'lat', 'lng']
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



    return res.json(group)
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

const addGroupImage = async (req, res, next) => {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.title = "Couldn't find a Group with the specified id";
        // err.errors = { message: "Group couldn't be found" };
        err.status = 404;
        return next(err);
    }

    if (req.user.id !== group.organizerId) {
        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = { message: 'Unauthorized' };
        err.status = 401;
        return next(err);
    }


    const { url, preview } = req.body;
    const image = await group.createImage({ url, preview });

    return res.json({
        id: image.id,
        url: image.url,
        preview: image.preview
    });
};

const editGroupById = async (req, res, next) => {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.title = "Couldn't find a Group with the specified id";
        // err.errors = { message: "Group couldn't be found" };
        err.status = 404;
        return next(err);
    }

    if (req.user.id !== group.organizerId) {
        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = { message: 'Unauthorized' };
        err.status = 401;
        return next(err);
    }

    const { name, about, type, private, city, state } = req.body;
    await group.update({
        name,
        about,
        type,
        private,
        city,
        state
    });

    return res.json(group);
};

const deleteGroupById = async (req, res, next) => {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.title = "Couldn't find a Group with the specified id";
        // err.errors = { message: "Group couldn't be found" };
        err.status = 404;
        return next(err);
    }

    if (req.user.id !== group.organizerId) {
        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = { message: 'Unauthorized' };
        err.status = 401;
        return next(err);
    }

    await group.destroy();

    return res.json({
        message: "Successfully deleted"
    });
};

module.exports = {
    getAllGroups,
    getCurrentUserGroups,
    getGroupById,
    createGroup,
    addGroupImage,
    editGroupById,
    deleteGroupById
}