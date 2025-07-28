<?php

namespace Construct;

class DefaultArtefactUpdater implements ArtefactUpdater
{
    public function update(Artefact $artefact): void
    {
        if ($artefact->integrity > 0 && $artefact->name !== "Sulfuras Core Fragment") {
            $artefact->integrity--;
        }
        $artefact->timeToLive--;
        if ($artefact->timeToLive < 0 && $artefact->integrity > 0 && $artefact->name !== "Sulfuras Core Fragment") {
            $artefact->integrity--;
        }
    }
}
