export function logout(req, res) {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
        }
        res.redirect("/")
    })
}