var emptyInput = document.querySelector(".empty-input");

// &------------------Sign Up Section--------------------
var signUpName = document.querySelector(".signup-name");
var signUpEmail = document.querySelector(".signup-email");
var signUpPassword = document.querySelector(".signup-password");
var signUp = document.querySelector(".signup");

var userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
for (var i = 0; i < userDetails.length; i++) {
    console.log(userDetails[i].email);
}

if (signUpName && signUpEmail && signUpPassword && signUp){

    function isSignUpEmpty() {
        if (signUpEmail.value == "" || signUpName.value == "" || signUpPassword.value =="") {
            return false
        } else {
            return true
        }
    }

    function store() {
        var details = {
            username: signUpName.value,
            email: signUpEmail.value,
            password: signUpPassword.value
        }
        userDetails.push(details);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
        
    signUp.addEventListener('click', function(){
        if (isSignUpEmpty() === false) {
            emptyInput.classList.remove("d-none");
            document.querySelector(".success").classList.add("d-none");
            document.querySelector(".exsit-email").classList.add("d-none");
            return false;
        }
        
        var emailExist = false;

        for (var i = 0; i < userDetails.length; i++){
            if (userDetails[i].email.toLowerCase() === signUpEmail.value.toLowerCase()){
                emailExist = true; 
                break;
            }
        }

        if(emailExist){
            document.querySelector(".exsit-email").classList.remove("d-none");
            document.querySelector(".success").classList.add("d-none");
            emptyInput.classList.add("d-none");
            clearInputs();
        }
        else{
            store();
            document.querySelector(".success").classList.remove("d-none");
            document.querySelector(".exsit-email").classList.add("d-none");
            emptyInput.classList.add("d-none");
            clearInputs();
        }
    
    })
}

//* ---------------------Login Section-------------------
var loginEmail = document.querySelector(".signinemail");
var loginPassword = document.querySelector(".signinpassword");
var loginBtn = document.querySelector(".login");

if (loginEmail && loginPassword && loginBtn){
    var userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

    function isLoginEmpty() {
        if (loginEmail.value == "" || loginPassword.value == "") {
            return false
        } else {
            return true
        }
    }

    function login() {
        if (isLoginEmpty() == false) {
            emptyInput.classList.remove("d-none");
            document.querySelector(".error").classList.add("d-none");
            return false;
        }
        for (var i = 0; i < userDetails.length; i++) {
            if (userDetails[i].email.toLowerCase() == loginEmail.value.toLowerCase() && userDetails[i].password.toLowerCase() == loginPassword.value.toLowerCase()) {
                localStorage.setItem('sessionUsername', userDetails[i].username)
                document.body.innerHTML = `
                <section class=" d-flex justify-content-center align-items-center">
                    <div class="main-section rounded-2">
                        <h1 class="welcome-color text-center">Welcome <span>${userDetails[i].username}</span></h1>
                    </div>
                </section>
                `
            }else{
                clearInputs()
                document.querySelector(".error").classList.remove("d-none");
                emptyInput.classList.add("d-none");
            }
        }
    }
    loginBtn.addEventListener("click", login);
}


//? Clear inputs Function

function clearInputs(){
    // signUpName.value = "";
    // signUpEmail.value ="";
    // signUpPassword.value ="";
    loginEmail.value ="";
    loginPassword.value ="";
}