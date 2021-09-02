const signUpForm = document.querySelector("#signUpForm");
const modalRegister = document.getElementById('signUpModal')
const register_modal = new mdb.Modal(modalRegister)

const modalLogin = document.getElementById('loginModal');
const login_modal = new mdb.Modal(modalLogin);


// listen for auth status
auth.onAuthStateChanged(user =>{
    if(user){
        document.getElementById('logout').classList.remove("d-none");
        document.getElementById('account').classList.remove("d-none");
        document.getElementById('login').classList.add("d-none");
        document.getElementById('signup').classList.add("d-none");

        // account details

        document.getElementById('accountUsername').innerHTML = "Username: "+ user.displayName
        document.getElementById('accountMail').innerHTML = "Mail: "+ user.email;
        document.getElementById('accountDate').innerHTML = "Date of registration: "+ user.metadata.creationTime;



    } else {
        document.getElementById('login').classList.remove("d-none");
        document.getElementById('signup').classList.remove("d-none");
        document.getElementById('logout').classList.add("d-none");
        document.getElementById('account').classList.add("d-none");
    }
})

// sign up 
signUpForm.addEventListener('submit', (e)=>{
    e.preventDefault();


    // getting the user info
    const email = signUpForm['email'].value;
    const password = signUpForm['password'].value;
    const confirmPassword = signUpForm['confirm-password'].value;


    // checking for matching passwords
    if(password === confirmPassword){
        auth.createUserWithEmailAndPassword(email, password).then(cred =>{
            cred.user.updateProfile({
                displayName: signUpForm['name'].value
            })
            register_modal.toggle();
            signUpForm.reset();

        })

    // catching errors
        .catch((error) =>{
            const error_code = error.code;
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
    // in case posswords dont match
    } else {
        signUpForm['confirm-password'].classList.add('is-invalid')
    }

});

// log out

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) =>{
    e.preventDefault();
    auth.signOut();
})

// log in

const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    // getting user info
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred =>{

        // closing the modal and resetting the form
        login_modal.toggle();
        loginForm.reset();
    })
})

// account details

