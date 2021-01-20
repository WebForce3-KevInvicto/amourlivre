
/*** FICHIER EN CHARGE DES ANIMATION DE LA PAGE ACCEUIL ***/

const register = {

    // Propriété utilisée pour vérifer la force du mot de passe
    strength: {
        0: "Vide",
        1: "Très Faible",
        2: "Faible",
        3: "Moyen",
        4: "Bon",
        5: "Très Bon"

    },

    //Propriété utilisée pour stocker les constraints d'erreur ou succes.
    constraints: [],

    // Méthode d'initialisation du module register
    init: function () {

        // Je cible l'input du mot de passe
        const password = document.querySelector('#registration_form_plainPassword');

        // J'accroche un event de type 'input' sur l'input que j'ai précédement ciblé
        // et je lie une méthode handler qui va traiter l'event.
        password.addEventListener('input', register.handlePasswordInput);
        // password.addEventListener('keypress', register.handlePasswordInput);

        


    },
    // Méthode Handler qui traite l'event 'input' sur l'input mot de passe
    // Méthode responsable d'afficher la force du mot de passe
    // et une lise des contraintes remplies ou non. 
    handlePasswordInput: function (evt) {

        //Debug
        console.log(evt.keyCode);
        
        // Je stock dans une variable l'élément cible de l'event
        const passwordInput = evt.target;

        // let keyboardKey = "";

        // Je stock dans une variable la valeur saisie par l'utilisateur
        // A partir de l'élément stocké dans la variable précédente.
        const passwordValue = passwordInput.value;

        // Je cible l'élément <meter> qui va se coloriser selon la force du mot de passe
        const meter = document.getElementById('password-strength-meter');

        // Je cible l'élément "<span>" qui va afficher le mot correspondant à la force du constraints.
        const strengthTextSpan = document.querySelector('.strength-text')

        // Je cible l'élément "<p>" qui va afficher la liste des contrainte remplie ou non.
        const constraintsText = document.getElementById('password-strength-text');

        // J'initialise une variable à 0, qui récupèrera la force du mot de passe.
        let strengthScore = 0;



    //    if(evt.keyCode !== 8){
    //        keyboardKey = ""
           
    //    } else {
    //         keyboardKey = evt.keyCode;
    //    }
        
        // Debug
        console.log(passwordValue);

        // Si la valeur du mot de passe(passwordValue) est != de vide
        if(passwordValue !== "") {

            // Alors, si la valeur contient un caractère minuscule.
            if (passwordValue.match(/[a-z]+/)) {
                // Alors,

                    // Force=1
                    strengthScore = 1;

                    // Liste de contraintes
                   strengthTextSpan.innerHTML= register.strength[strengthScore];
                   register.constraints= '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';

                // Puis, si la valeur contient une minuscule ET une majuscule
                if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/)){
                    //Alors,

                    //Force = 2
                    strengthScore = 2;

                    // Liste de contraintes
                    strengthTextSpan.innerHTML= register.strength[strengthScore];
                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                    register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';

                    //Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre
                    if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/)){
                         //Force = 3
                        strengthScore = 3;

                        // Liste de contraintes
                        strengthTextSpan.innerHTML= register.strength[strengthScore];
                        register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                        register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                        register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';

                        // Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre ET un caractère spécial
                        if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                            //Force = 4
                            strengthScore = 4;

                            // Liste de contraintes
                            strengthTextSpan.innerHTML= register.strength[strengthScore];
                            register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                            register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                            register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                            register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';

                            //Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre ET un caractère spécial ET est > à 8 caractères
                            if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/) && passwordValue.length >= 8){
                                //Force = 5
                                strengthScore = 5;

                                // Liste de contraintes
                                strengthTextSpan.innerHTML= register.strength[strengthScore];
                                register.constraints  = '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                                register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                            }
                        } 

                   
                    }
                    
                    // Ou si, la valeur contient une minuscule ET une majuscule ET un caractère spécial
                    if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[-+!*$@%_!]/)) {
                        //Force = 3
                        strengthScore = 3;

                        // Liste de contraintes
                        strengthTextSpan.innerHTML= register.strength[strengthScore];
                        register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                        register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                        register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                    }



               
                } 
                
                //Si, la valeur contient une minuscule ou un chiffre
                if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[0-9]+/)){
                     //Force = 2
                     strengthScore = 2;

                    strengthTextSpan.innerHTML= register.strength[strengthScore];
                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                    register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';

               
                }
                
                //Si, la valeur contient une minuscule et un caractère spécial    
                if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                    //Force = 2
                    strengthScore = 2;
                    strengthTextSpan.innerHTML= register.strength[strengthScore];
                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                    register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                
                }
            
            }

            if(passwordValue.match(/[A-Z]+/)){
                  // Force=1
                  strengthScore = 1;

                  // Liste de contraintes
                 strengthTextSpan.innerHTML= register.strength[strengthScore];
                 register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';

                // Puis, si la valeur contient une minuscule ET une majuscule
                if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/)){
                    //Alors,

                    //Force = 2
                    strengthScore = 2;

                    // Liste de contraintes
                    strengthTextSpan.innerHTML= register.strength[strengthScore];
                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                    register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';

                    //Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre
                    if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/)){
                         //Force = 3
                        strengthScore = 3;

                        // Liste de contraintes
                        strengthTextSpan.innerHTML= register.strength[strengthScore];
                        register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                        register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                        register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';

                        // Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre ET un caractère spécial
                        if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                            //Force = 4
                            strengthScore = 4;

                            // Liste de contraintes
                            strengthTextSpan.innerHTML= register.strength[strengthScore];
                            register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                            register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                            register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                            register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';

                            //Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre ET un caractère spécial ET est > à 8 caractères
                            if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/) && passwordValue.length >= 8){
                                //Force = 5
                                strengthScore = 5;

                                // Liste de contraintes
                                strengthTextSpan.innerHTML= register.strength[strengthScore];
                                register.constraints  = '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                                register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                            }
                        } 

                   
                    }
                    
                    // Ou si, la valeur contient une minuscule ET une majuscule ET un caractère spécial
                    if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[-+!*$@%_!]/)) {
                        //Force = 3
                        strengthScore = 3;

                        // Liste de contraintes
                        strengthTextSpan.innerHTML= register.strength[strengthScore];
                        register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                        register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                        register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                    }



               
                } 
                
                //Si, la valeur contient une minuscule ou un chiffre
                if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[0-9]+/)){
                     //Force = 2
                     strengthScore = 2;

                    strengthTextSpan.innerHTML= register.strength[strengthScore];
                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                    register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';

               
                }
                
                //Si, la valeur contient une minuscule et un caractère spécial    
                if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                    //Force = 2
                    strengthScore = 2;
                    strengthTextSpan.innerHTML= register.strength[strengthScore];
                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                    register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                
                }
            }

            if(passwordValue.match(/[0-9]+/)){
                 // Force=1
                 strengthScore = 1;

                 // Liste de contraintes
                strengthTextSpan.innerHTML= register.strength[strengthScore];
                register.constraints = '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';

                               // Puis, si la valeur contient une minuscule ET une majuscule
                               if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/)){
                                //Alors,
            
                                //Force = 2
                                strengthScore = 2;
            
                                // Liste de contraintes
                                strengthTextSpan.innerHTML= register.strength[strengthScore];
                                register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
            
                                //Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre
                                if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/)){
                                     //Force = 3
                                    strengthScore = 3;
            
                                    // Liste de contraintes
                                    strengthTextSpan.innerHTML= register.strength[strengthScore];
                                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
            
                                    // Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre ET un caractère spécial
                                    if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                                        //Force = 4
                                        strengthScore = 4;
            
                                        // Liste de contraintes
                                        strengthTextSpan.innerHTML= register.strength[strengthScore];
                                        register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                        register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                        register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                                        register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
            
                                        //Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre ET un caractère spécial ET est > à 8 caractères
                                        if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/) && passwordValue.length >= 8){
                                            //Force = 5
                                            strengthScore = 5;
            
                                            // Liste de contraintes
                                            strengthTextSpan.innerHTML= register.strength[strengthScore];
                                            register.constraints  = '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';
                                            register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                            register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                            register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                                            register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                                        }
                                    } 
            
                               
                                }
                                
                                // Ou si, la valeur contient une minuscule ET une majuscule ET un caractère spécial
                                if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[-+!*$@%_!]/)) {
                                    //Force = 3
                                    strengthScore = 3;
            
                                    // Liste de contraintes
                                    strengthTextSpan.innerHTML= register.strength[strengthScore];
                                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                                }
            
            
            
                           
                            } 
                            
                            //Si, la valeur contient une minuscule ou un chiffre
                            if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[0-9]+/)){
                                 //Force = 2
                                 strengthScore = 2;
            
                                strengthTextSpan.innerHTML= register.strength[strengthScore];
                                register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
            
                           
                            }
                            
                            //Si, la valeur contient une minuscule et un caractère spécial    
                            if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                                //Force = 2
                                strengthScore = 2;
                                strengthTextSpan.innerHTML= register.strength[strengthScore];
                                register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                            
                            }
            }

            if(passwordValue.match(/[-+!*$@%_!]/)){
                // Force=1
                strengthScore = 1;

                // Liste de contraintes
               strengthTextSpan.innerHTML= register.strength[strengthScore];
               register.constraints = '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';

                              // Puis, si la valeur contient une minuscule ET une majuscule
                              if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/)){
                                //Alors,
            
                                //Force = 2
                                strengthScore = 2;
            
                                // Liste de contraintes
                                strengthTextSpan.innerHTML= register.strength[strengthScore];
                                register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
            
                                //Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre
                                if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/)){
                                     //Force = 3
                                    strengthScore = 3;
            
                                    // Liste de contraintes
                                    strengthTextSpan.innerHTML= register.strength[strengthScore];
                                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
            
                                    // Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre ET un caractère spécial
                                    if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                                        //Force = 4
                                        strengthScore = 4;
            
                                        // Liste de contraintes
                                        strengthTextSpan.innerHTML= register.strength[strengthScore];
                                        register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                        register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                        register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                                        register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
            
                                        //Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre ET un caractère spécial ET est > à 8 caractères
                                        if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/) && passwordValue.length >= 8){
                                            //Force = 5
                                            strengthScore = 5;
            
                                            // Liste de contraintes
                                            strengthTextSpan.innerHTML= register.strength[strengthScore];
                                            register.constraints  = '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';
                                            register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                            register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                            register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                                            register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                                        }
                                    } 
            
                               
                                }
                                
                                // Ou si, la valeur contient une minuscule ET une majuscule ET un caractère spécial
                                if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[-+!*$@%_!]/)) {
                                    //Force = 3
                                    strengthScore = 3;
            
                                    // Liste de contraintes
                                    strengthTextSpan.innerHTML= register.strength[strengthScore];
                                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                                }
            
            
            
                           
                            } 
                            
                            //Si, la valeur contient une minuscule ou un chiffre
                            if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[0-9]+/)){
                                 //Force = 2
                                 strengthScore = 2;
            
                                strengthTextSpan.innerHTML= register.strength[strengthScore];
                                register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
            
                           
                            }
                            
                            //Si, la valeur contient une minuscule et un caractère spécial    
                            if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                                //Force = 2
                                strengthScore = 2;
                                strengthTextSpan.innerHTML= register.strength[strengthScore];
                                register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                            
                            }
            }

            if(passwordValue.length >= 8){
                // Force=1
                strengthScore = 1;

                // Liste de contraintes
               strengthTextSpan.innerHTML= register.strength[strengthScore];
               register.constraints  = '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';

                              // Puis, si la valeur contient une minuscule ET une majuscule
                              if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/)){
                                //Alors,
            
                                //Force = 2
                                strengthScore = 2;
            
                                // Liste de contraintes
                                strengthTextSpan.innerHTML= register.strength[strengthScore];
                                register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
            
                                //Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre
                                if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/)){
                                     //Force = 3
                                    strengthScore = 3;
            
                                    // Liste de contraintes
                                    strengthTextSpan.innerHTML= register.strength[strengthScore];
                                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
            
                                    // Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre ET un caractère spécial
                                    if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                                        //Force = 4
                                        strengthScore = 4;
            
                                        // Liste de contraintes
                                        strengthTextSpan.innerHTML= register.strength[strengthScore];
                                        register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                        register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                        register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                                        register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
            
                                        //Puis, si la valeur contient une minuscule ET une majuscule ET un chiffre ET un caractère spécial ET est > à 8 caractères
                                        if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[0-9]+/) && passwordValue.match(/[-+!*$@%_!]/) && passwordValue.length >= 8){
                                            //Force = 5
                                            strengthScore = 5;
            
                                            // Liste de contraintes
                                            strengthTextSpan.innerHTML= register.strength[strengthScore];
                                            register.constraints  = '<li><i class="fas fa-check"></i> 8 caractères minimum</li>';
                                            register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                            register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                            register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
                                            register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                                        }
                                    } 
            
                               
                                }
                                
                                // Ou si, la valeur contient une minuscule ET une majuscule ET un caractère spécial
                                if(passwordValue.match(/[a-z]+/) &&  passwordValue.match(/[A-Z]+/) && passwordValue.match(/[-+!*$@%_!]/)) {
                                    //Force = 3
                                    strengthScore = 3;
            
                                    // Liste de contraintes
                                    strengthTextSpan.innerHTML= register.strength[strengthScore];
                                    register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i> Au moins une lettre majuscule</li>';
                                    register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                                }
            
            
            
                           
                            } 
                            
                            //Si, la valeur contient une minuscule ou un chiffre
                            if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[0-9]+/)){
                                 //Force = 2
                                 strengthScore = 2;
            
                                strengthTextSpan.innerHTML= register.strength[strengthScore];
                                register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i> Au moins un chiffre</li>';
            
                           
                            }
                            
                            //Si, la valeur contient une minuscule et un caractère spécial    
                            if (passwordValue.match(/[a-z]+/) && passwordValue.match(/[-+!*$@%_!]/)){
                                //Force = 2
                                strengthScore = 2;
                                strengthTextSpan.innerHTML= register.strength[strengthScore];
                                register.constraints = '<li><i class="fas fa-check"></i> Au moins une lettre minuscule</li>';
                                register.constraints += '<li><i class="fas fa-check"></i>Au moins un caractère spécial parmi $ @ % * + - _ !</li>';
                            
                            }
            }
               
        }

        constraintsText.innerHTML = register.constraints;
        // Update the password strength meter
        meter.value = strengthScore;





    }
}


// Une fois le DOM chargé, la méthode init de l'objet register est exécutée :
document.addEventListener('DOMContentLoaded', register.init);
