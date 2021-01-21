<?php

namespace App\Form;

use App\Entity\Matching;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MatchingType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('rate')
            ->add('created_at')
            ->add('updated_at')
            ->add('userA')
            ->add('userB')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Matching::class,
        ]);
    }
}
