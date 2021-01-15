<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $gender;

    /**
     * @ORM\Column(type="datetime")
     */
    private $birthdate;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $postal_code;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $preference;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $role;

    /**
     * @ORM\Column(type="datetime")
     */
    private $last_connection;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updated_at;

    /**
     * @ORM\OneToOne(targetEntity=Ranking::class, mappedBy="user_id", cascade={"persist", "remove"})
     */
    private $ranking;

    /**
     * @ORM\OneToMany(targetEntity=Photo::class, mappedBy="user_id", orphanRemoval=true)
     */
    private $photos;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="user_id", orphanRemoval=true)
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=Matching::class, mappedBy="userA_id", orphanRemoval=true)
     */
    private $matchingsA;

    /**
     * @ORM\OneToMany(targetEntity=Matching::class, mappedBy="userB", orphanRemoval=true)
     */
    private $matchingsB;

    /**
     * @ORM\OneToMany(targetEntity=Conversation::class, mappedBy="userA", orphanRemoval=true)
     */
    private $conversationsA;

    /**
     * @ORM\OneToMany(targetEntity=Conversation::class, mappedBy="userB", orphanRemoval=true)
     */
    private $conversationsB;

    /**
     * @ORM\OneToMany(targetEntity=Message::class, mappedBy="user", orphanRemoval=true)
     */
    private $messages;

    public function __construct()
    {
        $this->photos = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->matchingsA = new ArrayCollection();
        $this->matchingsB = new ArrayCollection();
        $this->conversationsA = new ArrayCollection();
        $this->conversationsB = new ArrayCollection();
        $this->messages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    public function getBirthdate(): ?\DateTimeInterface
    {
        return $this->birthdate;
    }

    public function setBirthdate(\DateTimeInterface $birthdate): self
    {
        $this->birthdate = $birthdate;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postal_code;
    }

    public function setPostalCode(string $postal_code): self
    {
        $this->postal_code = $postal_code;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPreference(): ?string
    {
        return $this->preference;
    }

    public function setPreference(?string $preference): self
    {
        $this->preference = $preference;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): self
    {
        $this->role = $role;

        return $this;
    }

    public function getLastConnection(): ?\DateTimeInterface
    {
        return $this->last_connection;
    }

    public function setLastConnection(\DateTimeInterface $last_connection): self
    {
        $this->last_connection = $last_connection;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeInterface $updated_at): self
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function getRanking(): ?Ranking
    {
        return $this->ranking;
    }

    public function setRanking(Ranking $ranking): self
    {
        // set the owning side of the relation if necessary
        if ($ranking->getUserId() !== $this) {
            $ranking->setUserId($this);
        }

        $this->ranking = $ranking;

        return $this;
    }

    /**
     * @return Collection|Photo[]
     */
    public function getPhotos(): Collection
    {
        return $this->photos;
    }

    public function addPhoto(Photo $photo): self
    {
        if (!$this->photos->contains($photo)) {
            $this->photos[] = $photo;
            $photo->setUserId($this);
        }

        return $this;
    }

    public function removePhoto(Photo $photo): self
    {
        if ($this->photos->removeElement($photo)) {
            // set the owning side to null (unless already changed)
            if ($photo->getUserId() === $this) {
                $photo->setUserId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setUserId($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getUserId() === $this) {
                $comment->setUserId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Matching[]
     */
    public function getMatchingsA(): Collection
    {
        return $this->matchingsA;
    }

    public function addMatchingsA(Matching $matchingsA): self
    {
        if (!$this->matchingsA->contains($matchingsA)) {
            $this->matchingsA[] = $matchingsA;
            $matchingsA->setUserAId($this);
        }

        return $this;
    }

    public function removeMatchingsA(Matching $matchingsA): self
    {
        if ($this->matchingsA->removeElement($matchingsA)) {
            // set the owning side to null (unless already changed)
            if ($matchingsA->getUserAId() === $this) {
                $matchingsA->setUserAId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Matching[]
     */
    public function getMatchingsB(): Collection
    {
        return $this->matchingsB;
    }

    public function addMatchingsB(Matching $matchingsB): self
    {
        if (!$this->matchingsB->contains($matchingsB)) {
            $this->matchingsB[] = $matchingsB;
            $matchingsB->setUserB($this);
        }

        return $this;
    }

    public function removeMatchingsB(Matching $matchingsB): self
    {
        if ($this->matchingsB->removeElement($matchingsB)) {
            // set the owning side to null (unless already changed)
            if ($matchingsB->getUserB() === $this) {
                $matchingsB->setUserB(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Conversation[]
     */
    public function getConversationsA(): Collection
    {
        return $this->conversationsA;
    }

    public function addConversationsA(Conversation $conversationsA): self
    {
        if (!$this->conversationsA->contains($conversationsA)) {
            $this->conversationsA[] = $conversationsA;
            $conversationsA->setUserA($this);
        }

        return $this;
    }

    public function removeConversationsA(Conversation $conversationsA): self
    {
        if ($this->conversationsA->removeElement($conversationsA)) {
            // set the owning side to null (unless already changed)
            if ($conversationsA->getUserA() === $this) {
                $conversationsA->setUserA(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Conversation[]
     */
    public function getConversationsB(): Collection
    {
        return $this->conversationsB;
    }

    public function addConversationsB(Conversation $conversationsB): self
    {
        if (!$this->conversationsB->contains($conversationsB)) {
            $this->conversationsB[] = $conversationsB;
            $conversationsB->setUserB($this);
        }

        return $this;
    }

    public function removeConversationsB(Conversation $conversationsB): self
    {
        if ($this->conversationsB->removeElement($conversationsB)) {
            // set the owning side to null (unless already changed)
            if ($conversationsB->getUserB() === $this) {
                $conversationsB->setUserB(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Message[]
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages[] = $message;
            $message->setUser($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getUser() === $this) {
                $message->setUser(null);
            }
        }

        return $this;
    }
}
