const planModel = require('../Models/planModel');

const getAllPlans = async (req, res) => {
    let plans = await planModel.find();
    if (plans) {
        res.json({
            msg: "Plans received",
            data: plans
        })
    }
    else {
        res.json({
            msg: "Plans not available"
        })
    }
}

const getPlan = async (req, res) => {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    if (plan) {
        res.json({
            msg: "Plan received",
            data: plan
        })
    }
    else {
        res.json({
            msg: "Plan not available"
        })
    }
}

const createPlan = async (req, res) => {
    let planData = req.body;
    let createdPlan = await planModel.create(planData);
    if (createdPlan) {
        res.json({
            msg: "Plan created successfully",
            data: createdPlan
        })
    }
    else {
        res.json({
            msg: "Plan not created"
        })
    }
}

const deletePlan = async (req, res) => {
    let id = req.params.id;
    let deletedPlan = await planModel.findByIdAndDelete(id);
    if (deletedPlan) {
        res.json({
            msg: "Plan deleted successfully",
            data: deletedPlan
        })
    }
    else {
        req.json({
            msg: "Plan not deleted"
        })
    }
}

const updatePlan = async (req, res) => {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    let data = await planModel.findByIdAndUpdate(id, dataToBeUpdated);
    if (data) {
        res.json({
            msg: "Data updated successfully",
            data: data
        })
    }
    else {
        res.json({
            msg: "Data not updated"
        })
    }
}

const top3Plans = async (req, res) => {
    let plans = await planModel.find().sort({
        ratingsAverage: -1
    }).limit(3);
    res.json({
        mgs: "Top 3 plans",
        data: plans
    })
}

module.exports = {
    getAllPlans: getAllPlans,
    getPlan: getPlan,
    createPlan: createPlan,
    deletePlan: deletePlan,
    updatePlan: updatePlan,
    top3Plans: top3Plans
}