// This is your test secret API key.
require('dotenv').config();
const SK = process.env.STRIPE_KEY;
const stripe = require('stripe')(SK);
const planModel = require('../Models/planModel');
const userModel = require('../Models/userModel');

const createSession = async (req, res) => {

    let userId = req.id;
    let planID = req.params.id;

    const user = await userModel.findById(userId);
    const plan = await planModel.findById(planID);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: user.email,
        client_refernece_id: plan._id,
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                name: plan.name,
                description: plan.description,
                amount: plan.price,
                current: "inr",
                quantity: 1
            },
        ],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/profile`,
        cancel_url: `${req.protocol}://${req.get('host')}/profile`,
    });

    res.status(200).json({
        msg: "Success",
        session
    })
};

module.exports = createSession;