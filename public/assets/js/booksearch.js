$(document).ready(function(){	
    $(".search-book").submit(function(event){
        event.preventDefault();
         var search = $("#books").val();
         // Si l'utilisateur click sur rechercher sans avoir saisis un titre 
          if(search == "")
          {
            // Alors on affiche un message d'erreur
              alert("Veuillez saisir le titre d'un livre");
         }
        // Sinon
          else{	
         // On initialise les variables nécéssaires dans lesquelles on va stocker les reponses que l'on recherche, retournées par l'API.   	
         var img = ""; // Image de couverture du livre
         var title = ""; // Titre du livre
         var authors = ""; // Auteur
         var synopsis = ""
         var datePublication = "";
         var publisher = "";
         var language = "";
         var isbn ="";
         var genre ="";
       
       //   var bodyElement = document.querySelector('body');
         var resultElement = document.querySelector('#result');
         console.log(resultElement);
         var template = document.querySelector('#cardResult');
                 
         // On envoie la requête à l'API
          $.get("https://www.googleapis.com/books/v1/volumes?q=" + search,function(response){
             console.log(response); // L'API nous retourne un tableau d'objets response. Il contient tout les livres correspondant à la recherche de l'utilisateur et pour chaque livre, toutes ses infos.
          
           // On utilise une boucle for pour récuperer les infos de chaque livre et les affichés. 
           for(i=0;i<response.items.length;i++)
           {
 
            var cloneTemplate = document.importNode(template.content, true);
 
            var cardElement = cloneTemplate.querySelector('.card');
            var addBookForm = cloneTemplate.querySelector('#book_form');
 
            var imgElement = cloneTemplate.querySelector('#book-cover');
            var titleInput =  cloneTemplate.querySelector('#book_form_title');
            var authorSelect = cloneTemplate.querySelector('#book_form_author');
            var thumbnailInput =  cloneTemplate.querySelector('#book_form_thumbnail');
            var synopsisTextarea = cloneTemplate.querySelector('#book_form_synopsis'); 
            var datePublicationDay = cloneTemplate.querySelector('#book_form_publication_date_day'); 
            var datePublicationMonth = cloneTemplate.querySelector('#book_form_publication_date_month'); 
            var datePublicationYear = cloneTemplate.querySelector('#book_form_publication_date_year'); 
            var publisherSelect = cloneTemplate.querySelector('#book_form_publisher');
            var languageInput = cloneTemplate.querySelector('#book_form_language');
            var isbnInput = cloneTemplate.querySelector('#book_form_isbn');
            var publisherOption = document.createElement('option');
            var genreSelect = cloneTemplate.querySelector('#book_form_genre');

             console.log(imgElement);
 
            // On stocke les infos dans les variables initialisées plus haut  
            title = response.items[i].volumeInfo.title ;  
            authors =response.items[i].volumeInfo.authors;

            $.each(authors, function(index){

                var authorOption = document.createElement('option');
                authorOption.setAttribute('value', authors[index]);
                authorOption.innerHTML = authors[index];
                authorSelect.appendChild(authorOption);

            })
            
            genres = response.items[i].volumeInfo.categories;

            $.each(genres, function(index){

              var genreOption = document.createElement('option');
              genreOption.setAttribute('value', genres[index]);
              genreOption.innerHTML = genres[index];
              genreSelect.appendChild(genreOption);

          })

            synopsis = response.items[i].volumeInfo.description;
            publisher = response.items[i].volumeInfo.publisher;
            publisherOption.setAttribute('value', publisher);
            publisherOption.innerHTML = publisher;
            publisherSelect.appendChild(publisherOption);
            language = response.items[i].volumeInfo.language;
            isbn = response.items[i].volumeInfo.industryIdentifiers[0].identifier;
            
 
             // console.log(response.items[i].volumeInfo.hasOwnProperty('imageLinks'));
 
            if(response.items[i].volumeInfo.hasOwnProperty('imageLinks')){
               img =  response.items[i].volumeInfo.imageLinks['thumbnail'];
            } else {
             img = "book.png";
            }
              
             // console.log(img);
        
            
 
            altImg = "Converture du livre " + title;
 
             imgElement.setAttribute('src', img);
             imgElement.setAttribute('alt', altImg);
             thumbnailInput.setAttribute('value', img);
             titleInput.setAttribute('value', title);
            //  authorSelect.setAttribute('value', author);
            //  publisherSelect.setAttribute('value', publisher);
             languageInput.setAttribute('value', language);
             isbnInput.setAttribute('value', isbn);
         
             synopsisTextarea.textContent = synopsis;
 
             // imgElement.appendTo(addBookForm);
             // titleInput.appendTo(addBookForm);
             // authorInput.appendTo(addBookForm);
             // thumbnailInput.appendTo(addBookForm);
             // synopsisTextarea.appendTo(addBookForm);
 
             // addBookForm.appendChild(cloneTemplate);
 
             console.log(addBookForm);
 
            // On les ajoutes dans le DOM.
            resultElement.appendChild(cardElement);
           
            console.log(resultElement);
          
           }
          });
       
       }
       return false;
    });
 
 });