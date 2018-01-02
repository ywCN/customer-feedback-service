// req: request
// res: response
// next: a function will be called when middleware finishes its work
// next can be used for done or chaining on next middleware
module.exports = (req, res, next) => {
    if (!req.user) {
        // 401: forbidden
        return res.status(401).send({ error: 'You must log in!' });
    }

    next();
};
