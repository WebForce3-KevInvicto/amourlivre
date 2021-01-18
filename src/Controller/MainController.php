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
        
        return $this->render('main/profil.html.twig', [
            'controller_name' => 'MainController',
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

}
