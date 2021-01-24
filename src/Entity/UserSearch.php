<?php

namespace App\Entity;

class UserSearch {

    /**
     * @var int|null
     */
    private $minAge;

    /**
     * @var int|null
     */
    private $maxAge;

    /**
     * Get the value of minAge
     *
     * @return  int|null
     */ 
    public function getMinAge()
    {
        return $this->minAge;
    }

    /**
     * Set the value of minAge
     *
     * @param  int|null  $minAge
     *
     * @return  self
     */ 
    public function setMinAge($minAge)
    {
        $this->minAge = $minAge;

        return $this;
    }

    /**
     * Get the value of maxAge
     *
     * @return  int|null
     */ 
    public function getMaxAge()
    {
        return $this->maxAge;
    }

    /**
     * Set the value of maxAge
     *
     * @param  int|null  $maxAge
     *
     * @return  self
     */ 
    public function setMaxAge($maxAge)
    {
        $this->maxAge = $maxAge;

        return $this;
    }
}