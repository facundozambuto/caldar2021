const technicianMethods = {};
const technicianModel = require('../models/technicianModel');

technicianMethods.addTechnician = async (req , res) => {
    const { firstName, lastName, employeeRecord, dateOfBirth, startWorkingDate } = req.body;

    const newTechnician = new technicianModel({
        firstName, lastName, employeeRecord, dateOfBirth, startWorkingDate
    });

    try {
        await newTechnician.save();

        res.status(200);
        res.json({
            success: true,
            technician: newTechnician,
            message: "Technician added successfully"
        });

    } catch (error) {
        res.status(400);
        res.json({
            success: false,
            message: "Error trying to add technician",
            stackTrace: error.message,
            technician: newTechnician
        });
    }
}

technicianMethods.getTechnicianByEmployeeRecord = async (req , res) => {
    const employeeRecord = req.employeeRecord;

    const technician = await technicianModel.find({employeeRecord: employeeRecord});

    if (technician) {
        res.status(200);
        res.json({
            success: true,
            technician: technician,
            message: "Technician added successfully"
        });
    } else {
        res.status(400);
        res.json({
            success: false,
            technician: technician,
            message: "Technician not found",
            stackTrace: error.message,
            exception: "TechnicianNotFoundException"
        });
    }
}

technicianMethods.getAllTechnicians = async (req , res) => {
    const technicians = await technicianModel.find();

    res.status(200);
    res.json({
        success: true,
        technicians: technicians,
        message: "Technicians fetched successfully."
    });
}

technicianMethods.updateTechnician = async (req , res) => {
    const { firstName, lastName, dateOfBirth, status, startWorkingDate } = req.body;
    const noteID = req.params.id;

    try {
        const updatedTechnician = await technicianModel.findOne({_id: noteID}).updateOne({$set: { firstName, lastName, dateOfBirth, status, startWorkingDate }});

        res.status(200);
        res.json({
            success: true,
            technician: updatedTechnician,
            message: "Technician was updated successfully"
        });
    } catch (error) {
        res.status(400);
        res.json({
            success: false,
            message: "Technician was not updated.",
            stackTrace: error.message,
            exception: "UpdateTechnicianException"
        });
    }
}

technicianMethods.deleteTechnician = async (req , res) => {
    const technicianId = req.params.id;
    
    try {
        await technicianModel.findByIdAndRemove(technicianId);
        res.json({
            success: true,
            message: "Technician removed successfully"
        });
    } catch (error) {
        res.status(400);
        res.json({
            success: false,
            message: "Technician was not deleted.",
            stackTrace: error.message,
            exception: "DeleteTechnicianException"
        });
    }
}

module.exports = technicianMethods;