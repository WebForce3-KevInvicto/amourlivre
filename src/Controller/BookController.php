<?php

namespace App\Controller;


use App\Entity\Book;
use App\Entity\User;
use App\Form\BookType;
use App\Repository\BookRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/")
 */
class BookController extends AbstractController
{
    /**
     * @Route("admin/books", name="book_index", methods={"GET"})
     */
    public function index(BookRepository $bookRepository): Response
    {
        return $this->render('book/index.html.twig', [
            'books' => $bookRepository->findAll(),
        ]);
    }

    /**
     * @Route("membre/book/new", name="book_new", methods={"GET","POST"})
     */
    public function new(Request $request, UserInterface $user, BookRepository $books): Response
    {
        
        
        $newBook = new Book();

        $booksList =  $books->findAll();
        $userLibrary =$user->getBooks();
        $userLibraryISBN = [];
        $bookTestISBN = [];

        foreach($userLibrary as $key => $bookTestLibrary){


            $userLibraryISBN [] =  $bookTestLibrary->getIsbn();

        }

        foreach($booksList as $key => $bookTest){


            $bookTestISBN [] =  $bookTest->getIsbn();

        }
    
        dump($bookTestISBN);
        dump($userLibraryISBN);
               
        $form = $this->createForm(BookType::class, $newBook, ['attr' => ['class' => 'addBookForm w--900 bck--alt br--15 p--2']]);
        $form->handleRequest($request);

   
        if ($form->isSubmitted()) {

            $requestParams = $request->request->all();

            $publicationDateString= $requestParams['book']['publication_date'];
    
    
            $requestBookISBN = $requestParams['book']['isbn'];

             
           if(in_array($requestBookISBN, $bookTestISBN)){

                    $book = $books->findOneBy([
                        'isbn' =>$requestBookISBN,
                    ]);
                    dump($book);

                    if(in_array($requestBookISBN, $userLibraryISBN)){

                        $this->addFlash('error', 'Vous avez déjà ce livre dans votre bibliothèque !');
                    }else{

                        $book->addUser($user);
                        $entityManager = $this->getDoctrine()->getManager();
                        $entityManager->persist($user);
                        $entityManager->flush();

                        $this->addFlash('success', 'Ajout du livre Reussie ! Vous pouvez dès à présent le retrouver dans votre bibliothèque ou faire une nouvelle recherche.');
                    }      
           }else{

                if(strlen($publicationDateString) == 10){

                    $publicationDate = \DateTime::createFromFormat('d-m-Y', $publicationDateString, null);
                } elseif(strlen($publicationDateString) == 7){
                    $publicationDate = \DateTime::createFromFormat('m-Y', $publicationDateString, null);
                }else{
                    $publicationDate = \DateTime::createFromFormat('Y', $publicationDateString, null);
                } 

                $newBook->setPublicationDate($publicationDate);
                $newBook->setCreatedAt($newBook->getCreatedAt());
                $newBook->addUser($user);
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($newBook);
                $entityManager->flush();

                $this->addFlash('success', 'Ajout du livre Reussie ! Vous pouvez dès à présent le retrouver dans votre bibliothèque ou faire une nouvelle recherche.');
            }
           
          
          
           
        }

        return $this->render('book/new.html.twig', [
            'bookForm' => $form->createView(),
        ]);
    }

    /**
     * @Route("membre/book/{id}", name="book_show", methods={"GET"})
     */
    public function show(Book $book): Response
    {
        return $this->render('book/show.html.twig', [
            'book' => $book,
        ]);
    }

    /**
     * @Route("admin/book/edit/{id}", name="book_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Book $book): Response
    {
        $form = $this->createForm(BookType::class, $book);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('book_index');
        }

        return $this->render('book/edit.html.twig', [
            'book' => $book,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("admin/book/delete/{id}", name="book_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Book $book): Response
    {
        if ($this->isCsrfTokenValid('delete'.$book->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($book);
            $entityManager->flush();
        }

        return $this->redirectToRoute('book_index');
    }
}
