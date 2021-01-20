<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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
     * @Route("/profil", name="profil")
     */
    public function profil(): Response
    {
        
        return $this->render('book/index.html.twig', [
            'controller_name' => 'BookController',
        ]);
    }

    /**
     * @Route("/matching", name="matching")
     */
    public function matching(): Response
    {
        
        return $this->render('main/matching.html.twig', [
            'controller_name' => 'MainController',
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
     * @Route("/contact", name="contact")
     */
    public function contact(): Response
    {
        
        return $this->render('footer/contact.html.twig', [
            'controller_name' => 'MainController',
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
