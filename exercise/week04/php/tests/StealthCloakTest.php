<?php

use Construct\Artefact;
use Construct\ConstructInventory;

test('Stealth Cloak v2.0 perd 1 intégrité tous les 2 jours, même après expiration', function () {
    $cloak = new Artefact('Stealth Cloak v2.0', 4, 10);
    $inventory = new ConstructInventory([$cloak]);
    $result = [];
    for ($day = 1; $day <= 6; $day++) {
        $inventory->updateSimulation();
        $result[] = $cloak->integrity;
    }
    expect($result)->toBe([10, 9, 9, 8, 8, 7]);
});

test('Stealth Cloak v2.0 ne régénère jamais son intégrité', function () {
    $cloak = new Artefact('Stealth Cloak v2.0', 0, 1);
    $inventory = new ConstructInventory([$cloak]);
    $result = [];
    for ($day = 1; $day <= 4; $day++) {
        $inventory->updateSimulation();
        $result[] = $cloak->integrity;
    }
    expect($result)->toBe([1, 0, 0, 0]);
});

test('Legacy artefact : comportement inchangé pour Aged Signal', function () {
    $aged = new Artefact('Aged Signal', 2, 0);
    $inventory = new ConstructInventory([$aged]);
    $result = [];
    for ($day = 1; $day <= 4; $day++) {
        $inventory->updateSimulation();
        $result[] = $aged->integrity;
    }
    expect($result)->toBe([1, 2, 4, 6]); // selon la logique d'origine
});

test('Legacy artefact : comportement inchangé pour Sulfuras Core Fragment', function () {
    $sulfuras = new Artefact('Sulfuras Core Fragment', 0, 80);
    $inventory = new ConstructInventory([$sulfuras]);
    $result = [];
    for ($day = 1; $day <= 3; $day++) {
        $inventory->updateSimulation();
        $result[] = [$sulfuras->integrity, $sulfuras->timeToLive];
    }
    expect($result)->toBe([
        [80, 0],
        [80, 0],
        [80, 0],
    ]);
});

test('Legacy artefact : comportement inchangé pour Backdoor Pass to TAFKAL80ETC Protocol', function () {
    $pass = new Artefact('Backdoor Pass to TAFKAL80ETC Protocol', 11, 20);
    $inventory = new ConstructInventory([$pass]);
    $result = [];
    for ($day = 1; $day <= 5; $day++) {
        $inventory->updateSimulation();
        $result[] = $pass->integrity;
    }
    expect($result)->toBe([22, 24, 26, 28, 30]); // selon la logique d'origine
});
