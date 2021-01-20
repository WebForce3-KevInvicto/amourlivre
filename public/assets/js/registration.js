
/*** FICHIER EN CHARGE DES ANIMATION DE LA PAGE ACCEUIL ***/

const register = {

    // Propriété utilisé pour vérifer la force du mot de passe
    strength: {
        0: "Vide",
        1: "Très Faible",
        2: "Faible",
        3: "Moyen",
        4: "Bon",
        5: "Très Bon"

    },

    strengthText: "",
    constraints: [],


    init: function () {


        const password = document.querySelector('#registration_form_plainPassword');


        password.addEventListener('input', register.handlePasswordInput);
        password.addEventListener('keypress', register.handlePasswordInput);

        


    },

    handlePasswordInput: function (evt) {

        console.log(evt.keyCode);
        
        const passwordInput = evt.target;
        let keyboardKey = "";
        const passwordValue = passwordInput.value;
        const meter = document.getElementById('password-strength-meter');
        const strengthTextSpan = document.querySelector('.strength-text')
        const constraintsText = document.getElementById('password-strength-text');
        let strengthScore = 0;



       if(evt.keyCode !== 8){
           keyboardKey = ""
           
       } else {
            keyboardKey = evt.keyCode;
       }
       
        console.log(passwordValue);
        if(passwordValue !== "" || keyboardKey == 8 ) {


            if (passwordValue.match(/[a-z]+/)) {

                strengthScore = 1;
                strengthTextSpan.innerHTML = register.strength[strengthScore];
                register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';

                if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[A-Z]+/)) {

                    strengthScore = 2;
                    strengthTextSpan.innerHTML = register.strength[strengthScore];
                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                    register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';

                    if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/)) {

                        strengthScore = 3;
                        strengthTextSpan.innerHTML = register.strength[strengthScore];
                        register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                        register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                        register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';

                        if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/)) {

                            strengthScore = 4;
                            strengthTextSpan.innerHTML = register.strength[strengthScore];
                            register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                            register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                            register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';

                            if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/)) {

                                strengthScore = 4;
                                strengthTextSpan.innerHTML = register.strength[strengthScore];
                                register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                                register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis:</li>';
                                register.constraints += '<span class="d--inlblc text-center">$ @ % * + - _ !</span>';


                                if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/) && passwordValue.length >= 8) {
                                    strengthScore = 5;
                                    strengthTextSpan.innerHTML = register.strength[strengthScore];
                                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis:</li>';
                                    register.constraints += '<span class="d--inlblc text-center">$ @ % * + - _ !</span>';
                                    register.constraints += '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';
                                }

                            }

                        }

                    } else if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[A-Z]+/) && passwordValue.match(/[-+!*$@%_!]/)) {
                        strengthScore = 3;
                        strengthTextSpan.innerHTML = register.strength[strengthScore];
                        register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                        register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                        register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis:</li>';
                        register.constraints += '<span class="d--inlblc text-center">$ @ % * + - _ !</span>';
                    }else if(passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/) && passwordValue.match(/[a-z]+/)){
                        strengthScore = 3;
                        strengthTextSpan.innerHTML = register.strength[strengthScore];
                        register.constraints = '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                        register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis:</li>';
                        register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                    }

                } else if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[0-9]+/)) {
                    strengthScore = 2;
                    strengthTextSpan.innerHTML = register.strength[strengthScore];
                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                    register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                } else if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[-+!*$@%_!]/)) {
                    strengthScore = 2;
                    strengthTextSpan.innerHTML = register.strength[strengthScore];
                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                    register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis:</li>';
                    register.constraints += '<span class="d--inlblc text-center">$ @ % * + - _ !</span>';
                }

            } else if (passwordValue.match(/[A-Z]+/)) {

                strengthScore = 1;
                strengthTextSpan.innerHTML = register.strength[strengthScore];
                register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';

                if (passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/)) {

                    strengthScore = 2;
                    strengthTextSpan.innerHTML = register.strength[strengthScore];
                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                    register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';

                    if (passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/)) {

                        strengthScore = 3;
                        strengthTextSpan.innerHTML = register.strength[strengthScore];
                        register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                        register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                        register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis:</li>';
                        register.constraints += '<span class="d--inlblc text-center">$ @ % * + - _ !</span>';

                        if (passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/) && passwordValue.length >= 8) {
                            console.log('B3 bis');
                            strengthScore = 3;
                            strengthTextSpan.innerHTML = register.strength[strengthScore];
                            register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                            register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                            register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis:</li>';
                            register.constraints += '<span class="d--inlblc text-center">$ @ % * + - _ !</span>';
                            register.constraints += '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';
                        }
                    }

                } else if (passwordValue.match(/[A-Z]+/) && passwordValue.match(/[-+!*$@%_!]/)) {
                    strengthScore = 2;
                    strengthTextSpan.innerHTML = register.strength[strengthScore];
                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                    register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis:</li>';
                    register.constraints += '<span class="d--inlblc text-center">$ @ % * + - _ !</span>';
                }


            } else if (passwordValue.match(/[0-9]+/)) {
                strengthScore = 1;
                strengthTextSpan.innerHTML = register.strength[strengthScore];
                register.constraints = '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';

                if (passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/)) {
                    strengthScore = 2;
                    strengthTextSpan.innerHTML = register.strength[strengthScore];
                    register.constraints = '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                    register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis:</li>';
                    register.constraints += '<span class="d--inlblc text-center">$ @ % * + - _ !</span>';

                

                        if (passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/) && passwordValue.length >= 8) {
                            strengthScore = 2;
                            strengthTextSpan.innerHTML = register.strength[strengthScore];
                            register.constraints = '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                            register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis:</li>';
                            register.constraints += '<span class="d--inlblc text-center">$ @ % * + - _ !</span>';
                            register.constraints += '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';
                        }
                    

                    
                }


            } else if (passwordValue.match(/[-+!*$@%_!]/)) {
                strengthScore = 1;
                strengthTextSpan.innerHTML = register.strength[strengthScore];
                register.constraints= '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis:</li>';
                register.constraints += '<span class="d--inlblc text-center">$ @ % * + - _ !</span>';


            } else if (passwordValue.length >= 8) {
                strengthScore = 1;
                strengthTextSpan.innerHTML = register.strength[strengthScore];
                register.constraints += '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';
            } 
            
        } else {
            strengthTextSpan.innerHTML = register.strength[strengthScore];
            register.constraints = "<li>8 caractères minimum</li>";
            register.constraints += "<li>Au moins une lettre minuscule</li>";
            register.constraints += "<li>Au moins une lettre majuscule</li>";
            register.constraints += "<li>Au moins un chiffre</li>";
            register.constraints += '<li>Au moins un caractère spécial parmis:</li>';
            register.constraints += '<span class="d--inlblc text-center">$ @ % * + - _ !</span>';
        }


        constraintsText.innerHTML = register.constraints;
        // Update the password strength meter
        meter.value = strengthScore;





    }
}


// Une fois le DOM chargé, la méthode init de l'objet register est exécutée :
document.addEventListener('DOMContentLoaded', register.init);
