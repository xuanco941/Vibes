const authSchema = require('../model/Schema/authSchema');
class profileController {
    getProfile2(req , res , next){
        authSchema.findById(req.cookies.userCookie)
        .then(usermain => 
        authSchema.findOne({username : req.params.username})
        .then(user => {
            res.render('profile' , {usermain : usermain.username , username : user.username});
        })
        .catch(res.send('Trang ca nhan nay khong ton tai'))
        );

    }

    getProfile(req , res , next){
        var userURL = authSchema.findOne({username : req.params.username});
        authSchema.findById(req.cookies.userCookie)
        .then(usermain => {
            if(usermain){
                userURL.findOne({
                    username : req.params.username
                }).then(user => {
                    res.render('profile' , {usermain : usermain.username , username : user.username});
                })       

            }
        }
        ).catch(res.send('Trang ca nhan nay kh ton tai'));
    }

}
module.exports = new profileController;