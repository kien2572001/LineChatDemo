<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\LineService;
use App\Http\Controllers\Controller;

class LineController extends Controller
{
    //
    protected $lineService;

    public function __construct(LineService $lineService)
    {
        $this->lineService = $lineService;
    }

    public function handleLineCallback(Request $request)
    {
        $token = $this->lineService->getLineToken($request->code);
        $profile = $this->lineService->getUserProfile($token['access_token']);
        $this->lineService->verifyIDToken($token['id_token']);
        return response()->json([
            'token' => $token,
            'profile' => $profile,
        ]);
    }
}