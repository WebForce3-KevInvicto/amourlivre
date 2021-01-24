<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Contact;
use App\Form\ContactType;
use App\Entity\UserSearch;
use App\Form\UserSearchType;
use Doctrine\ORM\Mapping\Entity;
use App\Repository\BookRepository;
use App\Repository\UserRepository;
use App\Repository\MatchingRepository;
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
     * @Route("/profil/{id}", name="profil")
     */
    public function profil(User $user): Response
    {
        return $this->render('user/show.html.twig', [
            'user' => $user,
            'books' => $user->getBooks()
        ]);
    }

    /**
     * @Route("/matching", name="matching")
     */
    public function matching(MatchingRepository $matchingRepository, UserRepository $userRepository, UserInterface $user, Request $request): Response
    {
        $userAId = $user->getId();
        $userSearch = new UserSearch();
        $form = $this->createForm(UserSearchType::class, $userSearch);
        $form->handleRequest($request);


        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($userSearch);
            $entityManager->flush();

            return $this->redirectToRoute('matching_index');
        }
        
        $matchingsList = $matchingRepository->findByUserAId($userAId);
        dump($matchingsList);
        return $this->render('main/matching.html.twig', [
            'usersFilter' => $userRepository->findAllVisibleQuery($userSearch),
            'controller_name' => 'MainController',
            'matchings' => $matchingsList,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/messagerie", name="messagerie")
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

            //return $this->redirectToRoute('contact_index');
        }
        return $this->render('footer/contact.html.twig', [
            'messageConfirmation'   => $messageConfirmation,
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

}
