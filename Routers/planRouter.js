const express = require('express');
const planRouter = express.Router();
const {protectRoute, isAuthorised} = require('../Controllers/authController');
const {getAllPlans, top3Plans, getPlan, createPlan, updatePlan, deletePlan} = require('../Controllers/planController');

//To get all plans
planRouter
    .route('/allplans')
    .get(getAllPlans);

planRouter
    .route('/top3')
    .get(top3Plans);

//Own Plans
planRouter.use(protectRoute);
planRouter
    .route('/:id')
    .get(getPlan);

//Admin and restraunt owners can only CRUD plans
planRouter.use(isAuthorised(['admin', 'owner']));
planRouter
    .route('/createplan')
    .post(createPlan)

planRouter
    .route('/:id')
    .patch(updatePlan)
    .delete(deletePlan);

module.exports = planRouter;