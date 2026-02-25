
// expose le firstName dans les locals pour utilisation dans les ejs sans avoir a les passer en paramètre 
export function setUserInLocals(req, res, next) {
    res.locals.firstName = null;
    if (req.session.user) {
        res.locals.firstName = req.session.user.firstName;
    }
    next();
}