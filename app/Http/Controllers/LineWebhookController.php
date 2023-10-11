<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\LineBotService as LINEBot;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use Illuminate\Support\Facades\Log;
use App\Models\Message;

class LineWebhookController extends Controller
{
    public function message(Request $request) {
        $data = $request->all();
        $events = $data['events'];

        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.message.channel_secret')]);

        foreach ($events as $event) {
            // メッセージの保存処理を追記
            Message::create([
                'line_user_id' => $event['source']['userId'],
                'line_message_id' => $event['message']['id'],
                'text' => $event['message']['text'],
            ]);
             //自動返信が不要であれば削除
            $response = $bot->replyText($event['replyToken'], "DM Viet");
            //Log::info($response->getHTTPStatus() . ': ' . $response->getRawBody());
        }

        return;
    }
}
