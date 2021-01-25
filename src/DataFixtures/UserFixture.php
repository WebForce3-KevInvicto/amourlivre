<?php


namespace App\DataFixtures;


use Faker\Factory;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class UserFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create();

        $gender= [
            'homme',
            'femme'
        ];

        $preferenceGender =[
            'hommes',
            'femmes'
        ];

        $lat = [
            43.2964,
            43.2532,
            43.2496,
            43.2645,
            43.2796,
            43.2532,
            43.3532,
            43.3503,

        ];

        $lng = [
            5.3533,
            5.3738,
            5.3834,
            5.4033,
            5.5034,
            5.5725,
            5.5695,
            5.5635,
        ];

       for($i = 0; $i < 100; $i++){
           $randomNumber = $faker->numberBetween(0, 7);
           $user = new User();
           $user
             ->setNickname($faker->name)
             ->setGender($gender[$faker->numberBetween(0, 1)])
             ->setBirthdate($faker->dateTimeThisCentury())
             ->setEmail($faker->email)
             ->setPassword('MyPassWord@13009')                      
             ->setPostalCode($faker->numberBetween(13000, 13016))
             ->setCity('Marseille')
             ->setPreference($preferenceGender[$faker->numberBetween(0, 1)])
             ->setDescription($faker->text)
             ->setLat($lat[$randomNumber])
             ->setLng($lng[$randomNumber])
             ->setAddress($faker->name);
            $manager->persist($user);

       }

        $manager->flush();
    }
}
