const ApiError = require("../api-error")
const ContactService = require("../services/contact.sevice.js")
const MongoDB = require("../utils/mongodb.util")

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, ' name cannot be empty'));
    }

    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.create(req.body)
        return res.send(document)
    }
    catch {
        return next(new ApiError(500, 'An error occurred while creating th contact'));
    }
}

exports.findAll = async (req, res, next) => {
    let documents = []
    try {
        const contactService = new ContactService(MongoDB.client)
        let name = req.query
        if (name) {
            try {
                documents = await contactService.findByName(name)
            } catch (err) { console.log(err); }

        } else {
            documents = await contactService.find({})
        }
    }
    catch (err) {
        return next(new ApiError(500, 'An error occurred while retrieving contact'));
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.findById(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'Contact not found'));
        }
        res.send(document)
    } catch {
        return next(new ApiError(500, `Error retrieving contact at id= ${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, "Data update can't be not empty"));
    }
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.update(req.params.id, req.body)
        if (!document) {
            return next(new ApiError(404, 'Contact not found'));
        }
        res.send({ "message": 'Contact updated successfully' })
    } catch {
        return next(new ApiError(500, `Error retrieving while update`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.delete(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'Contact not found'));
        }
        res.send({ "message": "delete contact successfully" })
    } catch {
        return next(new ApiError(500, `Error retrieving contact at id= ${req.params.id}`));
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.deleteAll()
        res.send({ "message": `deleted ${document} contact` })
    } catch {
        return next(new ApiError(500, 'An error occurred while deleting all contacts'));
    }
}

exports.findAllFavorites = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.findFavorite()
        res.send(document)
    } catch {
        return next(new ApiError(500, 'An error occurred while retrieving favorites'));
    }
}