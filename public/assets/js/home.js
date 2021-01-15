
/*** FICHIER EN CHARGE DES ANIMATION DE LA PAGE ACCEUIL ***/

const home={

    // Propriété utilisé pour vérifer la force du mot de passe
    strength: {
        0: "Vide",
        1: "Très Faible",
        2: "Faible",
        3: "Moyen",
        4: "Bon",
        5: "Très Bon"

    },

    message: "",

    
    init: function (){

        
        const password = document.querySelector('.input-password');
        

        password.addEventListener('input', home.handlePasswordInput);
        password.addEventListener('keydown', home.handlePasswordInput);

        const confirmPassword = document.querySelector('.confirm-password');

        confirmPassword.addEventListener('input', home.handleConfirmPasswordInput);

        const homeCarousel = document.querySelector('.carousel');
        // homeCarousel.carousel();

        

    },

    handleConfirmPasswordInput: function (evt){

    const confirmPasswordInput = evt.target;
    const confirmPasswordValue = confirmPasswordInput.value;

    const passwordInput = document.querySelector('.input-password');
    const passwordValue = passwordInput.value;

    if(confirmPasswordValue !== passwordValue){
        confirmPasswordInput.classList.add('invalid');
    } else if ( passwordValue == "" || confirmPasswordValue == "") {
        confirmPasswordInput.classList.add('invalid');
    } else {
        confirmPasswordInput.classList.remove('invalid');
        confirmPasswordInput.classList.add('valid');
    }


    },

    handlePasswordInput: function(evt) {

       console.log(evt);

        const passwordInput= evt.target;
        const keyboardKey = evt.keyCode; 
        const passwordValue = passwordInput.value;
        const meter = document.getElementById('password-strength-meter');
        const text = document.getElementById('password-strength-text');
        let strengthScore= 0;
       

        if(passwordValue !== "" || keyboardKey == 8){

            
            if(passwordValue.match(/[a-z]+/)){
              
                strengthScore = 1;
                home.message= "<li>Force: " + home.strength[strengthScore] + "</li>"
                home.message += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';

                if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/)){
                   
                    strengthScore = 2;
                    home.message= "<li>Force: " + home.strength[strengthScore] + "</li>";
                    home.message += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                    home.message += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                    
                    if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/)){
                      
                        strengthScore = 3;
                        home.message= "<li>Force: " + home.strength[strengthScore] + "</li>";
                        home.message += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                        home.message += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                        home.message += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';

                        if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/)){
                          
                            strengthScore = 4;
                            home.message= "<li>Force: " + home.strength[strengthScore] + "</li>";
                            home.message += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                            home.message += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                            home.message += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';

                            if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                                
                                strengthScore = 4;
                                home.message= "<li>Force: " + home.strength[strengthScore] + "</li>";
                                home.message += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                home.message += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                home.message += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                                home.message += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis $ @ % * + - _ !</li>';
                                

                                if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/) && passwordValue.length >= 8){
                                    strengthScore = 5;
                                    home.message= "<li>Force: " + home.strength[strengthScore] + "</li>";
                                    home.message += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                    home.message += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                    home.message += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                                    home.message += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis $ @ % * + - _ !</li>';
                                    home.message += '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';
                                }
                            
                            }

                        }

                    } else if (passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                        strengthScore = 3;
                        home.message= "<li>Force: " + home.strength[strengthScore] + "</li>";
                        home.message += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                        home.message += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                        home.message += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis $ @ % * + - _ !</li>';
                    }
                    
                } else if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[0-9]+/)){
                    strengthScore = 2;
                    home.message= "<li>Force: " + home.strength[strengthScore] + "</li>";
                    home.message += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                    home.message += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                } else if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                    strengthScore = 2;
                    home.message= "<li>Force: " + home.strength[strengthScore] + "</li>";
                    home.message += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                    home.message += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis $ @ % * + - _ !</li>';
                }
    
            } else if(passwordValue.match(/[A-Z]+/)){
              
                strengthScore = 1;
                home.message= "<li>Force: " + home.strength[strengthScore] + "</li>"
                home.message += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                
                if(passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/)){
                    
                    strengthScore = 2;
                    home.message= "<li>Force: " + home.strength[strengthScore] + "</li>";
                    home.message += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                    home.message += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';

                    if(passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                       
                        strengthScore = 3;
                        home.message= "<li>Force: " + home.strength[strengthScore] + "</li>";
                        home.message += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                        home.message += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                        home.message += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis $ @ % * + - _ !</li>';

                        if(passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/) && passwordValue.length >= 8){
                            console.log('B3 bis');
                            strengthScore = 3;
                            home.message= "<li>Force: " + home.strength[strengthScore] + "</li>";
                            home.message += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                            home.message += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                            home.message += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis $ @ % * + - _ !</li>';
                            home.message += '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';
                        }
                    }

                } else if (passwordValue.match(/[A-Z]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                    strengthScore = 2;
                    home.message= "<li>Force: " + home.strength[strengthScore] + "</li>";
                    home.message += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                    home.message += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis $ @ % * + - _ !</li>';
                }
                

            } else if (passwordValue.match(/[0-9]+/)){
                strengthScore = 1;
                home.message= "<li>Force: " + home.strength[strengthScore] + "</li>"
                home.message += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';

                if(passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                    strengthScore = 2;
                    home.message= "<li>Force: " + home.strength[strengthScore] + "</li>"
                    home.message += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                    home.message += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis $ @ % * + - _ !</li>';
                    
                    if(passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/) && passwordValue.length >= 8){
                        strengthScore = 2;
                        home.message= "<li>Force: " + home.strength[strengthScore] + "</li>"
                        home.message += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                        home.message += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis $ @ % * + - _ !</li>';
                        home.message += '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';
                    }

                }


            } else if(passwordValue.match(/[-+!*$@%_!]/)){
                home.message= "<li>Force: " + home.strength[strengthScore] + "</li>"
                home.message += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmis $ @ % * + - _ !</li>';
                
                             
            } else if(password.length >= 8){
                strengthScore = 1;
                home.message= "<li>Force: " + home.strength[strengthScore] + "</li>";
                home.message += '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';
            }

           


           
            text.innerHTML = home.message;
       
        } else {
            home.message= "<li>Force: " + home.strength[strengthScore] + "</li>"
            home.message += "<li>8 caractères minimum</li>";
            home.message += "<li>Au moins une lettre minuscule</li>";
            home.message += "<li>Au moins une lettre majuscule</li>";
            home.message += "<li>Au moins un chiffre</li>";
            home.message += '<li>Au moins un caractère spécial parmis $ @ % * + - _ !</li>';

            text.innerHTML = home.message;
        }


        
       
       
       

        // Update the password strength meter
        meter.value = strengthScore;

        // // Update the text indicator
        // if (passwordValue !== "") {
        //     text.innerHTML = "<li>Force: " + home.strength[strengthScore] + "</li>";
        //     text.innerHTML += "<li>8 caractères minimum</li>";
        //     text.innerHTML += "<li>Au moins une lettre minuscule</li>";
        //     text.innerHTML += "<li>Au moins une lettre majuscule</li>";
        //     text.innerHTML += "<li>Au moins un chiffre</li>";
        //     text.innerHTML += '<li>au moins un de ces caractères spéciaux parmis $ @ % * + - _ !</li>';



        // } else {
        //     text.innerHTML = "";
        // }
        
    }
}


// Une fois le DOM chargé, la méthode init de l'objet home est exécutée :
document.addEventListener('DOMContentLoaded', home.init);
