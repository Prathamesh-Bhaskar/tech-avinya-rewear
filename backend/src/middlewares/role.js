const role = (requiredRole) => (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
};

module.exports = role; 