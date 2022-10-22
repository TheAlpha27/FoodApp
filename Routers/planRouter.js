const planModel = require('../Models/planModel');
const express = require('express');
const planRouter = express.Router();
const {protectRoute, isAuthorised} = require('../Controllers/authController');

//To get all plans
planRouter
    .route('/allPlans')
    .get(getAllPlans);

//Own Plans
planRouter.use(protectRoute);
planRouter
    .route('/plan/:id')
    .get(getPlan);

//Admin and restraunt owners can only CRUD plans
planRouter.use(isAuthorised['admin', 'owner']);
planRouter
    .route('/crudPlan')
    .post(createPlan)
    .patch(updatePlan)
    .delete(deletePlan);
