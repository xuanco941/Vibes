class homeController{
    getHome(req , res) {
        res.render('home');
            
    }
}

module.exports = new homeController;