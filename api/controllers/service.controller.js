const serviceMethods = {};
const boilerModel = require('../models/boilerModel');
const serviceModel = require('../models/serviceModel');
const technicianModel = require('../models/technicianModel');

serviceMethods.addService = async (req , res) => {
    const { customer, technicianId, boilerId, start, end, allDay, resource, title } = req.body;

    const technician = await technicianModel.findOne({_id: technicianId});

    const boiler = await boilerModel.findOne({_id: boilerId});

    const newService = new serviceModel({
        customer, start, end, allDay, resource, title
    });

    newService.boiler = boiler;

    newService.technician = technician;

    try {
        await newService.save();

        res.status(200);
        res.json({
            success: true,
            service: newService,
            message: "Service added successfully"
        });

    } catch (error) {
        res.status(400);
        res.json({
            success: false,
            message: "Error trying to add service",
            stackTrace: error.message,
            service: newService
        });
    }
}

serviceMethods.getServiceByServiceId = async (req , res) => {
    const id = req.params.id;

    const service = await serviceModel.findOne({_id: id});

    if (service) {
        res.status(200);
        res.json({
            success: true,
            service: service,
            message: "Service added successfully"
        });
    } else {
        res.status(400);
        res.json({
            success: false,
            service: service,
            message: "Service not found",
            stackTrace: error.message,
            exception: "ServiceNotFoundException"
        });
    }
}

serviceMethods.getAllServices = async (req , res) => {
    const services = await serviceModel.find().populate('technician').populate('boiler');

    res.status(200);
    res.json({
        success: true,
        services: services,
        message: "Services fetched successfully."
    });
}

serviceMethods.updateService = async (req , res) => {
    const { customer, technicianId, boilerId, start, end, allDay, resource, title } = req.body;
    const serviceBody = { customer, technicianId, boilerId, start, end, allDay, resource, title };
    const id = req.params.id;

    let updatedService;

    try {
        if (serviceBody.technicianId || serviceBody.boilerId) {
            const serviceToBeUpdated = await serviceModel.findOne({_id: id});

            let technician = await serviceToBeUpdated.populate('technician');
            let boiler = await serviceToBeUpdated.populate('boiler');

            if (serviceToBeUpdated !== null && serviceToBeUpdated.technician !== null && serviceToBeUpdated.technician._id !== serviceBody.technicianId) {
                technician = await technicianModel.findOne({_id: serviceBody.technicianId});
            }

            if (serviceToBeUpdated !== null && serviceToBeUpdated.boiler !== null && serviceToBeUpdated.boiler._id !== serviceBody.boilerId) {
                boiler = await boilerModel.findOne({_id: serviceBody.boilerId});
            }
            
            updatedService = await serviceModel.findOneAndUpdate({_id: id}, {$set: { customer, technician, boiler, start, end, allDay, resource, title }}, {new: true});
        } else {
            updatedService = await serviceModel.findOneAndUpdate({_id: id}, {$set: { customer, start, end, allDay, resource, title }}, {new: true});
        }

        res.status(200);
        res.json({
            success: true,
            service: updatedService,
            message: "Service was updated successfully"
        });
    } catch (error) {
        res.status(400);
        res.json({
            success: false,
            message: "Service was not updated.",
            stackTrace: error.message,
            exception: "UpdateServiceException"
        });
    }
}

serviceMethods.deleteService = async (req , res) => {
    const serviceId = req.params.id;
    
    try {
        await serviceModel.findByIdAndRemove(serviceId);
        res.json({
            success: true,
            message: "Service removed successfully"
        });
    } catch (error) {
        res.status(400);
        res.json({
            success: false,
            message: "Service was not deleted.",
            stackTrace: error.message,
            exception: "DeleteServiceException"
        });
    }
}

module.exports = serviceMethods;