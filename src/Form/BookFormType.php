<?php

namespace App\Form;

use App\Entity\Book;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;

class BookFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('synopsis')
            ->add('thumbnail')
            ->add('language')
            ->add('isbn')
            ->add('publication_date', DateType::class, [
                'format' => 'yyyy-MM-dd',
                'widget' => 'text'
                ])
            // ->add('created_at')
            // ->add('updated_at')
            ->add('publisher')
            ->add('author')
            ->add('genre')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Book::class,
        ]);
    }
}
