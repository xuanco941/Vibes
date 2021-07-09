const authSchema = require('../model/Schema/authSchema') ;

class authController {
    getsignin (req , res) {
        authSchema.findById(req.cookies.userCookie)
        .then( data => {
            if(data)
            res.redirect('/home');
            else
            res.render('auth' , {layout: false});
        })
        .catch((err)=>{
            res.send('ERROR!!!');
        })
    }
    getsignup (req , res) {
        res.render('auth_signup' , {layout: false});
      
    }
    postsignup (req , res) {
        let username = req.body.username;
        let password = req.body.password;
        let _name = req.body._name;
       authSchema.findOne({username : username})
       .then(data => {
           if (data) 
            {res.render('auth_signup' , {messageerror : 'Tên tài khoản đã tồn tại, vui lòng dùng tên tài khoản khác'});}
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
        let username = req.body.username;
        let password = req.body.password;
        authSchema.findOne({username : username , password: password })
        .then(data => {
            if(data)
            {
            res.cookie('userCookie' , data._id.toString() , {expires: new Date(Date.now() + 200000000) , httpOnly : true });
            res.redirect('/home');    
            
        }
            else
            res.render('auth' , {messageerror: 'Tài khoản hoặc mật khẩu không chính xác'});
       })
       .catch(err => {
        res.render('auth_signup' , { messageerror : 'Sorry, đang bị lỗi gì ấy, đợi mình fix đã nhé :v'});
    })
       
      
    }
}

module.exports = new authController;