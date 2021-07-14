const authSchema = require('../model/Schema/authSchema');
class profileController {

    //lấy ra profile của user qua URl , res.params.[name] , /:name dùng làm biến cho route
    //var cho handlebars : usermain là tên tài khoản truy cập , username là tài khoản khách

    getProfile(req , res , next){
        
        var usermain ;
        authSchema.findById(req.cookies.userCookie).then(user => usermain = user.username) ;
        authSchema.findOne({username: req.params.username})
        .then(user => {
            if (user){
                res.render('profile' , {username : user.username , usermain: usermain } );
            }
            else {
                res.send('Khong co user nay');
            }
        }).catch(next);
    }
}
module.exports = new profileController;