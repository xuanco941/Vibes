const authSchema = require('../model/Schema/authSchema') ;

class authController {
    getsignin (req , res , next) {
        authSchema.findById(req.cookies.userCookie)
        .then( usermain => {
            if(usermain){
            res.redirect('/home');            
            }
            else
            res.render('auth' , {layout: false});
        })
        .catch(next)
    }
    getsignup (req , res) {
        res.render('auth_signup' , {layout: false});
      
    }
    postsignup (req , res) {
        let username = req.body.username.trim();
        let password = req.body.password.trim();
        let _name = req.body._name.trim();
       authSchema.findOne({username : username})
       .then(data => {
           if (data) 
            {res.render('auth_signup' , { layout:false , messageerror : 'Tên tài khoản đã tồn tại, vui lòng dùng tên tài khoản khác'});}
            else{
                authSchema.create({
                    username : username , password: password , _name : _name
                });

                setTimeout(() => {
                    res.redirect('/');
                }, 2000);
            }   
       })
      }
    postsignin (req , res ){
        let username = req.body.username.trim();
        let password = req.body.password.trim();
        authSchema.findOne({username : username , password: password })
        .then(data => {
            if(data)
            {
            res.cookie('userCookie' , data._id.toString() , {expires: new Date(Date.now() + 10000000) , httpOnly : false});

            // expires: new Date(Date.now() + 200000000) set time cookie will die after 2 days

            res.redirect('/home');
        }
            else
            res.render('auth' , { layout : false ,messageerror: 'Tài khoản hoặc mật khẩu không chính xác'});
       })
       .catch(err => {
        res.render('auth' , { messageerror : 'Sorry, đang bị lỗi gì ấy, đợi mình fix đã nhé :v'});
    })
       
      
    }
}

module.exports = new authController;