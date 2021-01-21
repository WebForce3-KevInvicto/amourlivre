<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nickname')
            ->add('gender')
            ->add('birthdate')
            ->add('email')
            ->add('address')
            ->add('postal_code')
            ->add('city')
            ->add('preference')
            ->add('roles')
            ->add('password')
            ->add('last_connection')
            ->add('created_at')
            ->add('updated_at')
            ->add('ranking')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
