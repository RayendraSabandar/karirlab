function transactionQuery(t) {
    const transaction = {
        transaction: t,
        validate: true
    }

    return transaction
}

module.exports = transactionQuery