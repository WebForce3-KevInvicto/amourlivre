<?php

namespace App\Entity;

use App\Repository\UserRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity(fields={"email"}, message="L'email saisi est déjà utilisé !")
 * @UniqueEntity(fields={"nickname"}, message="Le pseudonyme saisi est déjà utilisé !")
 */
class User implements UserInterface
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
    private $nickname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $gender;

    /**
     * @ORM\Column(type="datetime")
     */
    private $birthdate;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;

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
     * @ORM\Column(type="json_array")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

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
     * @ORM\OneToOne(targetEntity=Ranking::class, mappedBy="user", cascade={"persist", "remove"})
     */
    private $ranking;

    /**
     * @ORM\OneToMany(targetEntity=Photo::class, mappedBy="user", orphanRemoval=true)
     */
    private $photos;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="user", orphanRemoval=true)
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

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\ManyToMany(targetEntity=Book::class, inversedBy="users")
     * 
     */
    private $books;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $avatar;

    /**
     * @ORM\Column(type="float", scale=4, precision=6)
     */
    private $lat;

    /**
     * @ORM\Column(type="float", scale=4, precision=7)
     */
    private $lng;

    public function __construct()
    {
        $this->photos = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->matchingsA = new ArrayCollection();
        $this->matchingsB = new ArrayCollection();
        $this->conversationsA = new ArrayCollection();
        $this->conversationsB = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->books = new ArrayCollection();
        $this->last_connection = new DateTime();
        $this->created_at = new DateTime();
        $this->updated_at = new DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNickname(): ?string
    {
        return $this->nickname;
    }

    public function setNickname(string $nickname): self
    {
        $this->nickname = $nickname;

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

   public function getAge(): ?int
    {
        $now = new \DateTime;
        $interval = $now->diff($this->birthdate);
        $age = $interval->format("%y");
        
        return intval($age);
        
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
        if ($ranking->getUser() !== $this) {
            $ranking->setUser($this);
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
            $photo->setUser($this);
        }

        return $this;
    }

    public function removePhoto(Photo $photo): self
    {
        if ($this->photos->removeElement($photo)) {
            // set the owning side to null (unless already changed)
            if ($photo->getUser() === $this) {
                $photo->setUser(null);
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
            $comment->setUser($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getUser() === $this) {
                $comment->setUser(null);
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
            $matchingsA->setUserA($this);
        }

        return $this;
    }

    public function removeMatchingsA(Matching $matchingsA): self
    {
        if ($this->matchingsA->removeElement($matchingsA)) {
            // set the owning side to null (unless already changed)
            if ($matchingsA->getUserA() === $this) {
                $matchingsA->setUserA(null);
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

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->nickname;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|Book[]
     */
    public function getBooks(): Collection
    {
        return $this->books;
    }

    public function addBook(Book $book): self
    {
        if (!$this->books->contains($book)) {
            $this->books[] = $book;
        }

        return $this;
    }

    public function removeBook(Book $book): self
    {
        $this->books->removeElement($book);

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getLat(): ?float
    {
        return $this->lat;
    }

    public function setLat(float $lat): self
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLng(): ?float
    {
        return $this->lng;
    }

    public function setLng(float $lng): self
    {
        $this->lng = $lng;

        return $this;
    }
}
