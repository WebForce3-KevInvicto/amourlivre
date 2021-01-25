$(document).ready(function(){	
    $(".search-book").submit(function(event){
        event.preventDefault();
         let search = $("#books").val();
         let formatDate = function(input) {
          var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
          if (!input || !input.match(pattern)) {
            return null;
          }
          return input.replace(pattern, '$3-$2-$1');
        };


         // Si l'utilisateur click sur rechercher sans avoir saisis un titre 
          if(search == "")
          {
            // Alors on affiche un message d'erreur
              alert("Veuillez saisir le titre d'un livre");
         }
        // Sinon
          else{	
         // On initialise les letiables nécéssaires dans lesquelles on va stocker les reponses que l'on recherche, retournées par l'API.   	
         let img = ""; // Image de couverture du livre
         let title = ""; // Titre du livre
         let authors = ""; // Auteur
         let synopsis = ""
         let publicationDate = "";
         let publisher = "";
         let language = "";
         let isbn ="";
         
           
         let resultSection = document.querySelector('.searchbook-result-section');
         let resultElement = document.querySelector('#result');

         resultSection.classList.remove('d--none');

         while(resultElement.firstChild){
           resultElement.removeChild(resultElement.firstChild);
         }

         let template = document.querySelector('#form-template');
           
         // On envoie la requête à l'API
          $.get("https://www.googleapis.com/books/v1/volumes?q=" + search,function(response){
           
          
           // On utilise une boucle for pour récuperer les infos de chaque livre et les affichés. 
           for(i=0;i<response.items.length;i++)
           {
 
            let cloneTemplate = document.importNode(template.content, true);
 
            let cardElement = cloneTemplate.querySelector('.addBookForm');


            let imgElement = cloneTemplate.querySelector('#book_cover');
            let titleInput =  cloneTemplate.querySelector('#book_title');
            let authorsInput = cloneTemplate.querySelector('#book_author');
            let thumbnailInput =  cloneTemplate.querySelector('#book_thumbnail');
            let synopsisTextarea = cloneTemplate.querySelector('#book_synopsis'); 
            let publicationDateInput = cloneTemplate.querySelector('#book_publication_date');
            let languageInput = cloneTemplate.querySelector('#book_language');
            let isbnInput = cloneTemplate.querySelector('#book_isbn');
            let publisherInput = cloneTemplate.querySelector('#book_publisher');

 
            // On stocke les infos dans les variables initialisées plus haut
            
            // *** TITRE ***
            title = response.items[i].volumeInfo.title ;
            
            // *** AUTEUR(S) ***
            let authorsArray =response.items[i].volumeInfo.authors;

            authors = authorsArray.join(', ');

            // *** GENRE(S) ***
            
            genres = response.items[i].volumeInfo.categories;

          

            // *** DATE DE PUBLICATION ***

            publicationDate = response.items[i].volumeInfo.publishedDate;
            
         
            // *** SYNOPSIS ***
            synopsis = response.items[i].volumeInfo.description;

            // *** EDITEUR ***
            publisher = response.items[i].volumeInfo.publisher;
            

            // *** LANGUE ***
            language = response.items[i].volumeInfo.language;

            if(language == 'fr'){
              language = "Français";
            } else if(language == 'en'){
              language = "Anglais";
            } else if(language == 'al'){
              language = 'Allemands'
            } else if(language == 'es'){
              language = 'Espagnol';
            } else {
              language = "NC"
            }

            // *** ISBN ***
            

            if(response.items[i].volumeInfo.hasOwnProperty('industryIdentifiers')){
              isbn = response.items[i].volumeInfo.industryIdentifiers[0].identifier;
           } else {
              isbn = "NC";
           }

            
            // *** COUVERTURE *** 
            if(response.items[i].volumeInfo.hasOwnProperty('imageLinks')){
               img =  response.items[i].volumeInfo.imageLinks['thumbnail'];
            } else {
             img = "../../assets/img/book/book.png";
            }
              
            let altImg = "Couverture du livre " + title;


            // Je place les infos dans l'attribut adéquat de chaque élément ciblé (suite)
              //*** IMG ***/
             imgElement.setAttribute('src', img);
             imgElement.setAttribute('alt', altImg);

             //*** THUMBNAIL INPUT ***
             thumbnailInput.setAttribute('value', img);

             //*** TITLE ***/
             titleInput.setAttribute('value', title);

             //*** LANGUAGE INPUT***/
             languageInput.setAttribute('value', language);

             //*** AUTHORS ***/
             authorsInput.setAttribute('value', authors);

             //*** PUBLISHER ***/
            publisherInput.setAttribute('value', publisher);

             //*** PUBLICATION DATE INPUT ***
             publicationDateInput.setAttribute('value', formatDate(publicationDate));
             
             //*** ISBN INPUT ***/
             isbnInput.setAttribute('value', isbn);
            
             //*** SYNOPSIS TEXTAREA ***
             synopsisTextarea.textContent = synopsis;
 
            // J'ajoute TOUS les éléments dans le DOM.
            resultElement.appendChild(cardElement);
            resultSection.appendChild(resultElement);
                       
          
           }
          });
       
       }
       return false;
    });
 
 });