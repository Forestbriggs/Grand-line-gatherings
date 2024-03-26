//TODO create venue functionality
//! Remember that some routes go groups router
//! and some go to venues router

const { Venue, Group } = require('../db/models');
const { addGroupImage } = require('./groups');

//* Route Functions ------------------------------------------------------------
//TODO implement co-host auth
const editVenueById = async (req, res, next) => {
    const { venueId } = req.params;
    const venue = await Venue.findByPk(venueId, {
        include: [
            {
                model: Group
            }
        ]
    });

    if (!venue) {
        const err = new Error("Venue couldn't be found");
        err.title = "Couldn't find a Venue with the specified id";
        err.status = 404;
        return next(err);
    }

    if (req.user.id !== venue.Group.dataValues.organizerId) {
        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = { message: 'Unauthorized' };
        err.status = 401;
        return next(err);
    }

    const { address, city, state, lat, lng } = req.body;
    await venue.update({
        address,
        city,
        state,
        lat,
        lng
    });

    delete venue.dataValues.Group;

    return res.json(venue);
};

module.exports = {
    editVenueById,
}