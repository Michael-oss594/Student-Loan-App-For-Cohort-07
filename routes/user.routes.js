const express = require('express');

const router = express.Router();

const {
    apply,
    allLoans,
    loanById,
    searchByName,
    updateLoan,
    deleteLoan

} = require('../controller/user.controller');

router.post('/apply', apply);
router.get('/all-loans', allLoans);
router.get('/loan/:id', loanById);
router.get('/search', searchByName);
router.put('/update-loan/:id', updateLoan);
router.delete('/delete-loan', deleteLoan);

module.exports = router;