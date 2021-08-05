const authSchema = require('../model/Schema/authSchema');

class searchController {
    async getSearch(req, res, next) {
        var arrUser = [];
        var textSearch = req.query.search;
        var userQuery1 = []; 
        var userQuery2 = [];
        await authSchema.find({}).then((user) => {
            user.forEach((u) => {
                if (u.username) arrUser.push(u.username);
            });
        });
        
        arrUser.forEach((u) => {
            if(u.indexOf(textSearch) > -1)
            {
                userQuery1.push(u);
            }
        })
        
        userQuery1.forEach((u) => {
            authSchema.findOne({username : u}).then((data)=>{
                userQuery2.push({username : data.username , avatar : data.avatar});
            });
        });

        await authSchema.findById(req.cookies.userCookie)
            .then(usermain => {
                res.render('search', { usermain: usermain.username , userQuery : userQuery2 });        
            })
            .catch(next);
    }
}
module.exports = new searchController;