const getTransactions = async (req, res) => {
    try {
        const { type, search } = req.query;

        let query = {
            user: req.user.id,
        };

        if (type && type !== "all") {
            query.type = type;
        }

        if (search) {
            query.description = {
                $regex: search,
                $options: "i",
            };
        }

        const transactions = await transaction.find(query);

        res.json(transactions);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};