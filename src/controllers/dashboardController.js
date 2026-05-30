const Wallet = require("../models/Wallet")
const Transaction = require("../models/Transaction");

const getDashboard = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id;

        const wallet = await Wallet.findOne({
            user: userId,
        });

        const transactions = await Transaction.find({
            user: userId,
        })
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            balance: wallet ? wallet.balance : 0,
            actions: [
                "Deposit",
                "Withdraw",
                "Trade",
                "Gift Card"
            ],

            transactions,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });

    }
}

module.exports = {
    getDashboard,
}