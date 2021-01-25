<?php

namespace App\Repository;

use App\Entity\Matching;
use App\Entity\UserSearch;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Matching|null find($id, $lockMode = null, $lockVersion = null)
 * @method Matching|null findOneBy(array $criteria, array $orderBy = null)
 * @method Matching[]    findAll()
 * @method Matching[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MatchingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Matching::class);
    }

    public function findByUserAId ($userA)
    {
        return $this->createQueryBuilder('m')
        ->andWhere('m.userA = :val')
        ->orderBy('m.rate', 'DESC')
        ->setParameter('val', $userA)
        ->setMaxResults(20)
        ->getQuery()
        ->getResult()
        ;
    }



        // public function findAllUserBId(){

        //     return $this->createQueryBuilder('m')
        //             ->addselect('m.userB');

        // }


// /**
//      * @return Query
//      */
//     public function findAllVisibleQuery(UserSearch $search, $userA)
//     {
//         $query = $this->findVisibleQuery($userA);

//         $userBIds= $this->findAllUserBId();

//         foreach($userBIds as $key => $userBId){
//             if ($search->getMaxAge()) {
//                 $query = $query
//                     ->addselect('u.age')
//                     ->from('User', 'u')
//                     ->innerjoin('m.userB', 'u', 'WITH', 'u.id = :id')
//                     ->andWhere('u.age <= :maxAge')
//                     ->setParameter('maxAge', $search->getMaxAge())
//                     ->setParameter('id', $userBId);
//             }

//             return $query->getQuery();
//         }
        

//         if ($search->getLat() && $search->getLng() && $search->getDistance()) {
//             $query = $query
//                 ->select('p')
//                 ->andWhere('(6353 * 2 * ASIN(SQRT( POWER(SIN((p.lat - :lat) *  pi()/180 / 2), 2) +COS(p.lat * pi()/180) * COS(:lat * pi()/180) * POWER(SIN((p.lng - :lng) * pi()/180 / 2), 2) ))) <= :distance')
//                 ->setParameter('lng', $search->getLng())
//                 ->setParameter('lat', $search->getLat())
//                 ->setParameter('distance', $search->getDistance());
//         }

        
//     }



//     private function findVisibleQuery($userA)
//     {
//         return $this->createQueryBuilder('m')
//             ->where('m.userA = :val')
//             ->setParameter('val', $userA);
//     }



    // /**
    //  * @return Matching[] Returns an array of Matching objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Matching
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
