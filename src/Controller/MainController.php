<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Genre;
use App\Entity\Contact;
use App\Entity\Matching;
use App\Form\ContactType;
use App\Entity\UserSearch;
use App\Form\UserSearchType;
use Doctrine\ORM\Mapping\Entity;
use App\Repository\BookRepository;
use App\Repository\UserRepository;
use App\Repository\GenreRepository;
use App\Repository\MatchingRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="main")
     */
    public function index(): Response
    {
        
        return $this->render('main/index.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }

    /**
     * @Route("membre/profil/{id}", name="profil")
     */
    public function profil(User $user): Response
    {


        $userAge = $user->calculerAge($user->getBirthdate());
        dump($userAge);

        $user->setAge($userAge);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        return $this->render('user/show.html.twig', [
            'user' => $user,
            'books' => $user->getBooks()
        ]);
    }

    /**
     * @Route("membre/matching", name="matching")
     */
    public function matching(MatchingRepository $matchingRepository, GenreRepository $genreRepository, PaginatorInterface $paginator, UserRepository $userRepository, Request $request): Response
    {
        // $userAId = $userInterface->getId();
           
        $user = $this->getUser();


        $userMatchingA = $user->getMatchingsA();
        $entityManager = $this->getDoctrine()->getManager();
            
        foreach($userMatchingA as $m){
            dump($m);
            $user->removeMatchingsA($m);
            $entityManager->remove($m);
        }

        $entityManager->flush();
        
        
        $userAFavoriteGenre = $this->getUserFavoriteGenre($user, $genreRepository);
        dump($userAFavoriteGenre);

        $usersList = $userRepository->findAll();
        dump($usersList);
        $success = false;
        
        foreach($usersList as $key => $userB){

            $userBFavoriteGenre = $this->getUserFavoriteGenre($userB, $genreRepository);

            if($userBFavoriteGenre !== false &&  $userAFavoriteGenre !== false){

                if($userBFavoriteGenre['name'] == $userAFavoriteGenre['name'] && ($userB->getGender() === $user->getPreference()) && ($user->getGender() === $userB->getPreference())){

                    $rate = abs($userBFavoriteGenre['rate'] - $userAFavoriteGenre['rate']);
    
                    
                    $matching = new Matching();
                    $matching->setUserA($user);
                    $matching->setUserB($userB);
    
                    if($rate >= 0 && $rate < 5){
                        $matching->setRate(100);
                    } elseif($rate >= 5 && $rate < 10){
                        $matching->setRate(90);
                    }elseif($rate >= 10 && $rate < 20){
                        $matching->setRate(80);
                    }elseif($rate >= 20 && $rate < 30){
                        $matching->setRate(70);
                    }elseif($rate >= 30 && $rate < 40){
                        $matching->setRate(60);
                    }elseif($rate >= 40 && $rate <= 50){
                        $matching->setRate(50);
                    } else {
                        $matching->setRate(0);
                    }
       
                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->persist($matching);
                    $entityManager->flush();
                    
                    $success = true;
                }

            }

           
        }

        if($success == false){
            $this->addFlash('warning', 'Pensez à ajouter des livres dans votre bibliothèque !');
        }
        

        $matchingsList = $paginator->paginate(
            $matchingRepository->findByUserAId( $user),
            $request->query->getInt('page', 1),
            10
        
        );
        
        
        dump($user);

        return $this->render('main/matching.html.twig', [
            'controller_name' => 'MainController',
            'matchings' =>  $matchingsList,
            // 'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("membre/messagerie", name="messagerie")
     */
    public function messagerie(): Response
    {
        
        return $this->render('main/messagerie.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }

    /**
     * @Route("/contact", name="contact", methods={"GET","POST"})
     */
    public function contact(Request $request): Response
    {
        $contact = new Contact();
        $form = $this->createForm(ContactType::class, $contact);
        $form->handleRequest($request);

        // ON VALIDE LES INFOS DU FORMULAIRE
        $messageConfirmation = "Merci de remplir le formulaire";
        if ($form->isSubmitted() && $form->isValid()) {
            // IL FAUT COMPLETER LES INFOS MANQUANTES
            $contact->setDateMessage(new \DateTime());

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($contact);
            $entityManager->flush();

            $messageConfirmation = "Message bien reçu. Nous vous répondrons rapidement.";

            $this->addFlash("success", "Message bien reçu. Nous vous répondrons rapidement.");

            return $this->redirectToRoute('contact');
        }
        return $this->render('footer/contact.html.twig', [
            'messageConfirmation'  => $messageConfirmation,
            'contact' => $contact,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/cgu", name="cgu")
     */
    public function cgu(): Response
    {
        
        return $this->render('footer/cgu.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }

    /**
     * @Route("/cgv", name="cgv")
     */
    public function cgv(): Response
    {
        
        return $this->render('footer/cgv.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }

    /**
     * @Route("/about", name="about")
     */
    public function about(): Response
    {
        
        return $this->render('footer/about.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }

    /**
     * @Route("/mentions", name="mentions")
     */
    public function mentions(): Response
    {
        
        return $this->render('footer/mentions.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }

    public function getUserFavoriteGenre(User $user){

                // Je récupère tous les livres du user courant.
                $userABookCollection = $user->getBooks();
                    // dump($userABookCollection);
                // Je compte le nombre de livres
                $totalBooks= count($userABookCollection);
                // dump($totalBooks);
                $userAGenreArray = [];

                foreach($userABookCollection as $key => $bookCollection){

                        $userAGenreArray [] = $bookCollection->getGenre()->getName();

                }

                // dump($userAGenreArray);
                
                $totaux = array_count_values($userAGenreArray);
                // dump($totaux);

                if(!empty($totaux)){
                    $favoriteGenre = [];


                    arsort($totaux);
    
                    // dump($totaux);
    
                    $genreFavoriteName = array_key_first($totaux);
                    $total = $this->calculPercentage(max(array_values($totaux)), $totalBooks, 100);
    
                    $favoriteGenre['name'] = $genreFavoriteName;
                    $favoriteGenre['rate'] = $total;
    
                    // dump($favoriteGenre)   
                    
                    return  $favoriteGenre;
                } else {

                   return false;
                }
              

    }

    public function calculPercentage($nombre,$total,$pourcentage)
    { 
        $resultat = ($nombre/$total) * $pourcentage;
        return round($resultat); // Arrondi la valeur
    }


   

 
}
