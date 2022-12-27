<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class testController extends AbstractController
{
    #[Route('/api/v1/test', methods: ["GET"])]
    public function index(): JsonResponse
    {
        return new JsonResponse(["test" => "erfolgreich"]);
    }
}