const paginateHelper = require('express-handlebars-paginate');

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
    },

    select: function(selected, options) {
        return options
            .fn(this)
            .replace(
                new RegExp(' value="' + selected + '"'),
                '$& selected="selected"'
            )
            .replace(
                new RegExp('>' + selected + '</option>'),
                ' selected="selected"$&'
            )
    },



}