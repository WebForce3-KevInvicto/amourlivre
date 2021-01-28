<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\String\Slugger\SluggerInterface;

/**
 * @Route("/")
 */
class UserController extends AbstractController
{
    /**
     * @Route("admin/user", name="user_index", methods={"GET"})
     */
    public function index(UserRepository $userRepository): Response
    {
        return $this->render('user/index.html.twig', [
            'users' => $userRepository->findAll(),
        ]);
    }

    // /**
    //  * @Route("/new", name="user_new", methods={"GET","POST"})
    //  */
    // public function new(Request $request): Response
    // {
    //     $user = new User();
    //     $form = $this->createForm(UserType::class, $user);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {
    //         $entityManager = $this->getDoctrine()->getManager();
    //         $entityManager->persist($user);
    //         $entityManager->flush();

    //         return $this->redirectToRoute('user_index');
    //     }

    //     return $this->render('user/new.html.twig', [
    //         'user' => $user,
    //         'form' => $form->createView(),
    //     ]);
    // }

    /**
     * @Route("membre/user/{id}", name="user_show", methods={"GET"})
     */
    public function show(User $user): Response
    {
        return $this->render('user/show.html.twig', [
            'user' => $user,
            'books' => $user->getBooks()
        ]);
    }

    /**
     * @Route("membre/user/edit/{id}", name="user_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, User $user, SluggerInterface $slugger): Response
    {
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // UPLOAD DE PHOTO
            // https://symfony.com/doc/current/controller/upload_file.html
            $avatarFile = $form->get('avatar')->getData();
            // this condition is needed because the 'brochure' field is not required
            // so the PDF file must be processed only when a file is uploaded
            if ($avatarFile) {
                $originalFilename = pathinfo($avatarFile->getClientOriginalName(), PATHINFO_FILENAME);
                // this is needed to safely include the file name as part of the URL
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = $safeFilename . '-' . uniqid() . '.' . $avatarFile->guessExtension();

                // Move the file to the directory where brochures are stored
                try {
                    $avatarFile->move(
                        $this->getParameter('avatars_directory'),        // NE PAS OUBLIER DE CREER LE DOSSIER
                        $newFilename
                    );
                } catch (FileException $e) {
                    	$this->addFlash('error', "Un problème technique est survenur lors du téléchargement de l'avatar, veuillez ressayer ulterieurement");
                }

                // updates the 'brochureFilename' property to store the PDF file name
                // instead of its contents
                $user->setAvatar($newFilename);       // ON ENREGISTRE LE NOM DU FICHIER
            }

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            $this->addFlash('success', "Vos modifications ont bien été pris en compte !");
        }

        return $this->render('user/edit.html.twig', [
            'user' => $user,
            'userEditForm' => $form->createView(),
        ]);
    }

    /**
     * @Route("admin/user/delete/{id}", name="user_delete", methods={"DELETE"})
     */
    public function delete(Request $request, User $user): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('user_index');
    }
}
