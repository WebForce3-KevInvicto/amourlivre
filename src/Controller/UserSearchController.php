<?php

namespace App\Controller;

use App\Entity\UserSearch;
use App\Form\UserSearchType;
use App\Repository\UserSearchRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/user/search")
 */
class UserSearchController extends AbstractController
{
    /**
     * @Route("/", name="user_search_index", methods={"GET"})
     */
    public function index(UserSearchRepository $userSearchRepository): Response
    {
        return $this->render('user_search/index.html.twig', [
            'user_searches' => $userSearchRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="user_search_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $userSearch = new UserSearch();
        $form = $this->createForm(UserSearchType::class, $userSearch);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($userSearch);
            $entityManager->flush();

            return $this->redirectToRoute('user_search_index');
        }

        return $this->render('user_search/new.html.twig', [
            'user_search' => $userSearch,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="user_search_show", methods={"GET"})
     */
    public function show(UserSearch $userSearch): Response
    {
        return $this->render('user_search/show.html.twig', [
            'user_search' => $userSearch,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="user_search_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, UserSearch $userSearch): Response
    {
        $form = $this->createForm(UserSearchType::class, $userSearch);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('user_search_index');
        }

        return $this->render('user_search/edit.html.twig', [
            'user_search' => $userSearch,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="user_search_delete", methods={"DELETE"})
     */
    public function delete(Request $request, UserSearch $userSearch): Response
    {
        if ($this->isCsrfTokenValid('delete'.$userSearch->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($userSearch);
            $entityManager->flush();
        }

        return $this->redirectToRoute('user_search_index');
    }
}
