const query = require('../queries/operation')

const getOperationFiles = async (req, res, opId, name) => {
    
    return await query.downloadOperationFiles(opId, name)
        .then((file) => {
            const csv = file[0].toString();
            res.json({
                ok: true,
                message: 'got files successfully',
                csv
            })
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                message: 'error with getting files',
                err
            });
        });
}

module.exports = {
    getOperationFiles,   
}