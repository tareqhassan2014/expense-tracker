const {
    createCategory,
    getCategories,
    createTransaction,
    getTransaction,
    getLabels,
    deleteTransaction,
} = require('../controller/controller');

const router = require('express').Router();

router.route('/api/category').post(createCategory).get(getCategories);
router.route('/api/transaction').post(createTransaction).get(getTransaction).delete(deleteTransaction);
router.route('/api/labels').get(getLabels);

module.exports = router;
