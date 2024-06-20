const Login = (model) =>{
    const errors = {};

    if(!model.phone){
        errors.phone = "Phone is required!";
    }

    if(!model.password){
        errors.password = "Password is required!";
    }

    return errors;
}

const Register = (model) =>{

}

module.exports = {
    Login,
    Register
}