<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;

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
            ->add('roles', CollectionType::class, [
                'entry_type'   => ChoiceType::class,
                'entry_options'  => [
                    'label' => false,
                    'choices' => [
                        'Admin' => 'ROLE_ADMIN',
                        'user' => 'ROLE_USER',
                    ],
                ],
            ])
            ->add('password')
            ->add('description')
            ->add('last_connection')
            ->add('created_at')
            ->add('updated_at')
            ->add('ranking');
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
