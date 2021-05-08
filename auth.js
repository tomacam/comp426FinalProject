//signUp 
const signUpForm = document.querySelector("#signUpForm");
if(signUpForm) {
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get User info
    const email = signUpForm['usernameSignUp'].value;
    const password = signUpForm['passwordSignUp'].value;
    const name = signUpForm['nameSignUp'].value;
    const age = signUpForm['ageSignUp'].value;
    console.log(age);

    //sign up guser

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        cred.user.updateProfile({
            displayName: name
        })
        console.log(cred)
        return db.collection('users').doc(cred.user.uid).set({
            age: age
        });
    }).then(() => {
        signUpForm.reset();
        signUpForm.querySelector(".error").innerHTML= "Success";
    }).catch( err => {
        signUpForm.querySelector(".error").innerHTML = err.message;
    })
 

})
}

const logout = document.querySelector('#signOut');
if(logout) {
logout.addEventListener('click' , (e) => {
     e.preventDefault();
     auth.signOut();
    location.replace('./index.html');
})
}


const signInForm = document.querySelector('#signInForm');
if(signInForm) {
signInForm.addEventListener('submit', (e)=> {
    e.preventDefault();


    //get User info
    const email = signInForm['usernameSignIn'].value;
    const password = signInForm['passwordSignIn'].value;
    const color = signInForm['colorSignIn'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        if(color) {
        return db.collection('users').doc(cred.user.uid).update({
            color: color
        }); }
    }).then(() => {
        signInForm.reset();
        location.replace("./game.html")
        signInForm.querySelector(".error").innerHTML= "";
    }).catch( err => {
        signInForm.querySelector(".error").innerHTML = err.message;
    })
});
}

const userInfo = document.querySelector('#userInfo');
const grid = document.querySelector('#gameGrid');
if(userInfo) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          userInfo.textContent = `Welcome ${user.displayName}`
        }

        db.collection('users').doc(user.uid).get().then(doc => {
            userInfo.style.color = doc.data().color;
            grid.style.backgroundColor = doc.data().color;
        })
    });

}

let provider = new firebase.auth.GoogleAuthProvider();

const googleButton = document.querySelector('#googleDiv')
if(googleButton) {
    googleButton.addEventListener('click', function(event) {
        firebase.auth().signInWithPopup(provider).then(res => {
            return db.collection('users').doc(res.user.uid).update({
                color: "Red"
            });
        }).then(() => {
            location.replace("./game.html")
        });
    })
}

const colorPickerForm = document.querySelector('#colorPickerForm');
if(colorPickerForm) {
    colorPickerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const color = colorPickerForm['colorPicker'].value;
        var user = firebase.auth().currentUser;
        return db.collection('users').doc(user.uid).update({
            color: color
        }).then(() => {
            colorPickerForm.reset();
            db.collection('users').doc(user.uid).get().then(doc => {
                userInfo.style.color = doc.data().color;
                grid.style.backgroundColor = doc.data().color;
            })
        })
    })
}





