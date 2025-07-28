<?php

namespace Construct;

class Artefact
{
    public string $name;
    public int $timeToLive;
    public int $integrity;
    public int $cloakDayCounter = 0;

    public function __construct(string $name, int $timeToLive, int $integrity)
    {
        $this->name = $name;
        $this->timeToLive = $timeToLive;
        $this->integrity = $integrity;
    }

    public function __toString(): string
    {
        return "{$this->name}, 🥄 integrity: {$this->integrity}, 💓 timeToLive: {$this->timeToLive}";
    }
}
