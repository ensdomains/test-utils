function isException(error) {
    let strError = error.toString();
    return strError.includes('invalid opcode') || strError.includes('invalid JUMP') || strError.includes('revert');
}

function ensureException(error) {
    assert(isException(error), error.toString());
}

async function expectFailure(call) {
	let tx;
	try {
		tx = await call;
	} catch (error) {
		// Assert ganache revert exception
		assert.equal(
			error.message,
			'Returned error: VM Exception while processing transaction: revert'
		);
	}
	if(tx !== undefined) {
		assert.equal(parseInt(tx.receipt.status), 0);
	}
}

module.exports = {
    ensureException: ensureException,
    expectFailure: expectFailure
}