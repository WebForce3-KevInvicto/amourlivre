$(document).ready(function(){	
    $(".search-book").submit(function(event){
        event.preventDefault();
         let search = $("#books").val();
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
         let publicationDay = "";
         let publicationMonth = "";
         let publicationYear = "";
           
         let resultSection = document.querySelector('.searchbook-result-section');
         let resultElement = document.querySelector('#result');

         resultSection.classList.remove('d--none');

         while(resultElement.firstChild){
           resultElement.removeChild(resultElement.firstChild);
         }

         let template = document.querySelector('#cardResult');
           
         // On envoie la requête à l'API
          $.get("https://www.googleapis.com/books/v1/volumes?q=" + search,function(response){
           
          
           // On utilise une boucle for pour récuperer les infos de chaque livre et les affichés. 
           for(i=0;i<response.items.length;i++)
           {
 
            let cloneTemplate = document.importNode(template.content, true);
 
            let cardElement = cloneTemplate.querySelector('.article-book');


            let imgElement = cloneTemplate.querySelector('#book-cover');
            let titleInput =  cloneTemplate.querySelector('#book_form_title');
            let authorSelect = cloneTemplate.querySelector('#book_form_author');
            let thumbnailInput =  cloneTemplate.querySelector('#book_form_thumbnail');
            let synopsisTextarea = cloneTemplate.querySelector('#book_form_synopsis'); 
            let publicationDayInput =  cloneTemplate.querySelector('#book_form_publication_date_day');
            let publicationMonthInput =  cloneTemplate.querySelector('#book_form_publication_date_month');
            let publicationYearInput =  cloneTemplate.querySelector('#book_form_publication_date_year');
            let publisherSelect = cloneTemplate.querySelector('#book_form_publisher');
            let languageInput = cloneTemplate.querySelector('#book_form_language');
            let isbnInput = cloneTemplate.querySelector('#book_form_isbn');
            let publisherOption = document.createElement('option');
            let genreSelect = cloneTemplate.querySelector('#book_form_genre');
 
            // On stocke les infos dans les variables initialisées plus haut
            
            // *** TITRE ***
            title = response.items[i].volumeInfo.title ;
            
            // *** AUTEUR(S) ***
            authors =response.items[i].volumeInfo.authors;

            // Boucle foreach jQuery sur authors
            $.each(authors, function(index){
                // A chaque itération,

                // Je créé un élément <option> 
                let authorOption = document.createElement('option');

                // J'ajoute les info (de l'itération courantes) dans l'attribut adéquat de l'élément (partie 1)
                authorOption.setAttribute('value', authors[index]);
                //J'ajoute le innerHTML dans l'élément option
                authorOption.innerHTML = authors[index];
                // J'ajoute l'élément <option> dans son <select>.
                authorSelect.appendChild(authorOption);

            })

            // *** GENRE(S) ***
            
            genres = response.items[i].volumeInfo.categories;

            $.each(genres, function(index){

              let genreOption = document.createElement('option');

              // J'ajoute les infos dans l'attribut adéquat de l'élément (partie 2)
              //*** GENRE ***/
              genreOption.setAttribute('value', genres[index]);
              genreOption.innerHTML = genres[index];
              genreSelect.appendChild(genreOption);

          })

          // *** DATE DE PUBLICATION ***

            publicationDate = response.items[i].volumeInfo.publishedDate;

            let dateArray = publicationDate.split("-");

            if(dateArray[0] !== ""){
              publicationYear = dateArray[0];
            }

            if(dateArray[1] !== ""){
              publicationMonth = dateArray[1];
            }

            if(dateArray[2] !== ""){
              publicationDay = dateArray[2];
            }


            // *** SYNOPSIS ***
            synopsis = response.items[i].volumeInfo.description;

            // *** EDITEUR ***
            publisher = response.items[i].volumeInfo.publisher;
            

            // *** LANGUE ***
            language = response.items[i].volumeInfo.language;

            // *** ISBN ***
            isbn = response.items[i].volumeInfo.industryIdentifiers[0].identifier;
            
            // *** COUVERTURE *** 
            if(response.items[i].volumeInfo.hasOwnProperty('imageLinks')){
               img =  response.items[i].volumeInfo.imageLinks['thumbnail'];
            } else {
             img = "book.png";
            }
              
            let altImg = "Converture du livre " + title;


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

            //*** PUBLISHER OPTION***/
            publisherOption.setAttribute('value', publisher);
            publisherOption.innerHTML = publisher;
            // J'ajoute l'élément <option> dans son élément <select>.
            publisherSelect.appendChild(publisherOption);

            // //*** PUBLICATION DATE INPUT ***
            publicationDayInput.setAttribute('disabled', true);
            publicationMonthInput.setAttribute('disabled', true);
            publicationYearInput.setAttribute('disabled', true);

            if(publicationDay !== ""){
              publicationDayInput.setAttribute('value', publicationDay);
            }
            
            if(publicationMonth !== ""){
              publicationMonthInput.setAttribute('value', publicationMonth);
            }

            if( publicationYear !== ""){
              publicationYearInput.setAttribute('value', publicationYear);
            }
            
         
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