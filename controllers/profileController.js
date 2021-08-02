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

                res.render('profile' , {user : user.toObject(), usermain: usermain } );
            }
            else {
                res.send('Khong co user nay');
            }
        }).catch(next);
    }

    postProfile(req , res , next){
        authSchema.findById(req.cookies.userCookie).then((usermain)=>{
            usermain._name = req.body.FullName;
            usermain.username = req.body.userName;
            usermain.birthday = req.body.birthday;
            usermain.city = req.body.city;
            usermain.link = req.body.link;
            usermain.save();
            res.redirect(`/${usermain.username}`);
        })
        .catch(next);
    }
}
module.exports = new profileController;