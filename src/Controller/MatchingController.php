<?php

namespace App\Controller;

use App\Entity\Matching;
use App\Form\MatchingType;
use App\Repository\MatchingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/matching")
 */
class MatchingController extends AbstractController
{
    /**
     * @Route("/", name="matching_index", methods={"GET"})
     */
    public function index(MatchingRepository $matchingRepository): Response
    {
        return $this->render('matching/index.html.twig', [
            'matchings' => $matchingRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="matching_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $matching = new Matching();
        $form = $this->createForm(MatchingType::class, $matching);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($matching);
            $entityManager->flush();

            return $this->redirectToRoute('matching_index');
        }

        return $this->render('matching/new.html.twig', [
            'matching' => $matching,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="matching_show", methods={"GET"})
     */
    public function show(Matching $matching): Response
    {
        return $this->render('matching/show.html.twig', [
            'matching' => $matching,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="matching_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Matching $matching): Response
    {
        $form = $this->createForm(MatchingType::class, $matching);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('matching_index');
        }

        return $this->render('matching/edit.html.twig', [
            'matching' => $matching,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="matching_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Matching $matching): Response
    {
        if ($this->isCsrfTokenValid('delete'.$matching->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($matching);
            $entityManager->flush();
        }

        return $this->redirectToRoute('matching_index');
    }
}
