const { Categories, Transaction } = require('../models/models');

//Get controller
const createCategory = async (req, res) => {
    try {
        const { type, color } = req.body;
        const result = await Categories.create({ type, color });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const result = await Categories.find();
        const filter = await result.map((v) =>
            Object.assign({}, { type: v.type, color: v.color })
        );
        res.status(200).json(filter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTransaction = async (req, res) => {
    try {
        const { type, name, amount } = req.body;
        const result = await Transaction.create({ type, name, amount });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTransaction = async (req, res) => {
    try {
        const result = await Transaction.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const result = await Transaction.findByIdAndDelete(req.body._id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLabels = async (req, res) => {
    try {
        const result = await Transaction.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'type',
                    foreignField: 'type',
                    as: 'categories_info',
                },
            },
            {
                $unwind: '$categories_info',
            },
        ]);

        const filter = await result.map((v) =>
            Object.assign(
                {},
                {
                    _id: v._id,
                    type: v.type,
                    name: v.name,
                    color: v.categories_info['color'],
                }
            )
        );

        res.json(filter);
    } catch (error) {
        res.json({ message: error.message });
    }
};

module.exports = {
    createCategory,
    getCategories,
    createTransaction,
    getTransaction,
    getLabels,
    deleteTransaction
};
