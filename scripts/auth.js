const signUpForm = document.querySelector("#signUpForm");
signUpForm.addEventListener('submit', (e)=>{
    e.preventDefault();


    // getting the user info
    const email = signUpForm['email'].value;
    const password = signUpForm['password'].value;
    const confirmPassword = signUpForm['confirm-password'].value;


    // checking for matching passwords
    if(password === confirmPassword){
        auth.createUserWithEmailAndPassword(email, password).then(cred =>{
            console.log(cred);
        })

        .catch((error) =>{
            const error_code = error.code;
            console.log(error_code);
            switch (error_code) {
                case "auth/weak-password":
                    signUpForm['password'].classList.add('is-invalid');
                    document.getElementById('password-feedback').innerHTML = error.message;
                    break;
                case "auth/email-already-in-use":
                    signUpForm['email'].classList.add('is-invalid');
                    document.getElementById('email-feedback').innerHTML = error.message;
                default:
                    break;
            }

        }) 
    } else {
        signUpForm['confirm-password'].classList.add('is-invalid')
    }

})