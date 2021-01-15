
/**** FICHIER RESPONSABLE DE L'ANIMATION DU MENU FOOTER *****/


const footer= {

    init: function (){

        // Je cible le bouton responsable de l'ouverture/fermeture du menu du footer.
        const openFooterBtn = document.querySelector('.open-footer');

        // Je lui accroche un event 'hover', attaché à un handler
        // responsable d'afficher le tooltip.
        openFooterBtn.addEventListener('hover', footer.handleHover);
        
        // Je lui accroche un event 'click", attaché à un handler
        // responsable de l'affichage du menu footer.
        openFooterBtn.addEventListener('click', footer.handleClick);


    },

    // Handler responsable de l'affichage du menu footer.
    handleClick: function() {

        // Je cible le menu footer ayant la class 'footer-menu'.
        const footerMenu = document.querySelector('.footer-menu');
        
        // this represente ici l'élément sur lequel à eu lieu l'event => le bouton.
        // J'utilise toogle() pour ajouter/retirer la class active sur le bouton à chaque click sur lui même.(cf assets/css/components/footer-menu.css).
        this.classList.toggle('active');

        // J'utilise toogle() pour ajouter/retier la class open sur le menu à chaque click sur le bouton.
        footerMenu.classList.toggle('open');
    },

    handleHover: function(){

        // this représente l'élément sur lequel à eu lieu l'event => le bouton.
        // tooltip() fonction bootstrap pour afficher le tooltip.
        this.tooltip();
    }

}

document.addEventListener('DOMContentLoaded', footer.init);