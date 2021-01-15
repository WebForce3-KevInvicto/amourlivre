<?php

namespace App\Entity;

use App\Repository\BookRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=BookRepository::class)
 */
class Book
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
    private $title;

    /**
     * @ORM\Column(type="text")
     */
    private $synopsis;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $thumbnail;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $language;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $isbn;

    /**
     * @ORM\Column(type="datetime")
     */
    private $publication_date;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updated_at;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="book_id", orphanRemoval=true)
     */
    private $comments;

    /**
     * @ORM\ManyToOne(targetEntity=Publisher::class, inversedBy="books")
     * @ORM\JoinColumn(nullable=false)
     */
    private $publisher;

    /**
     * @ORM\ManyToMany(targetEntity=Author::class, inversedBy="books")
     */
    private $author;

    /**
     * @ORM\ManyToOne(targetEntity=Genre::class, inversedBy="books")
     * @ORM\JoinColumn(nullable=false)
     */
    private $genre;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->author = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSynopsis(): ?string
    {
        return $this->synopsis;
    }

    public function setSynopsis(string $synopsis): self
    {
        $this->synopsis = $synopsis;

        return $this;
    }

    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function setThumbnail(string $thumbnail): self
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function setLanguage(string $language): self
    {
        $this->language = $language;

        return $this;
    }

    public function getIsbn(): ?string
    {
        return $this->isbn;
    }

    public function setIsbn(string $isbn): self
    {
        $this->isbn = $isbn;

        return $this;
    }

    public function getPublicationDate(): ?\DateTimeInterface
    {
        return $this->publication_date;
    }

    public function setPublicationDate(\DateTimeInterface $publication_date): self
    {
        $this->publication_date = $publication_date;

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
            $comment->setBook($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getBook() === $this) {
                $comment->setBook(null);
            }
        }

        return $this;
    }

    public function getPublisher(): ?Publisher
    {
        return $this->publisher;
    }

    public function setPublisher(?Publisher $publisher): self
    {
        $this->publisher = $publisher;

        return $this;
    }

    /**
     * @return Collection|Author[]
     */
    public function getAuthor(): Collection
    {
        return $this->author;
    }

    public function addAuthor(Author $author): self
    {
        if (!$this->author->contains($author)) {
            $this->author[] = $author;
        }

        return $this;
    }

    public function removeAuthor(Author $author): self
    {
        $this->author->removeElement($author);

        return $this;
    }

    public function getGenre(): ?Genre
    {
        return $this->genre;
    }

    public function setGenre(?Genre $genre): self
    {
        $this->genre = $genre;

        return $this;
    }
}
