const logout = (req, res) => {
    console.log("Logging out");
    if (req.session) {
        req.session.destroy();
        
    }
    return res.redirect('/');
}


module.exports.logout = logout;