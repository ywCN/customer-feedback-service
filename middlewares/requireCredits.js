module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        // 400-499 is fine except 402 is reserved
        return res.status(403).send({ error: 'Not enough credits!' });
    }

    next();
};
