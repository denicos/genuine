module.exports = {
    ensureAuth: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/admin/auth')
        }
    },

    ensureGuest: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/admin/index')
        } else {
            return next()
        }
    }


}