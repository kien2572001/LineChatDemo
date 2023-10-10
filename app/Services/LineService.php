<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Carbon;

class LineService
{
  public function getLineToken($code)
  {
    $client = new Client();
    $header = [
      'Content-Type' => 'application/x-www-form-urlencoded',
    ];
    $response = $client->request(
      'POST',
      config('line.line_token_uri'),
      [
        'headers' => $header,
        'form_params' => [
          'grant_type' => 'authorization_code',
          'code' => $code,
          'redirect_uri' => "http://localhost:3000/callback",
          'client_id' => env('LINE_LOGIN_CHANNEL_ID'),
          'client_secret' => env('LINE_LOGIN_CHANNEL_SECRET'),
        ],
      ]
    );
    return json_decode($response->getBody()->getContents(), true);
  }

  public function getUserProfile($token)
  {
    $client = new Client();
    $header = [
      'Authorization' => 'Bearer ' . $token,
      'Accept' => 'application/json',
    ];
    $response = $client->request('GET', config('line.line_profile_uri'), [
      'headers' => $header,
    ]);
    return json_decode($response->getBody()->getContents(), true);
  }

  public function verifyIDToken($idToken)
  {
    $client = new Client();
    $response = $client->request('POST', config('line.line_verify_uri'), [
      'form_params' => [
        'id_token' => $idToken,
        'client_id' => env('LINE_LOGIN_CHANNEL_ID'),
      ],
    ]);
    return json_decode($response->getBody()->getContents(), true);
  }
}