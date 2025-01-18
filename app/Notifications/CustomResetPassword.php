<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as BaseResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPassword extends BaseResetPassword
{
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('パスワードリセットのリクエスト')
            ->line('このメールはあなたのアカウントのパスワードリセットをリクエストしたため送信されています。')
            ->action('パスワードをリセット', url(config('app.url').route('password.reset', $this->token, false)))
            ->line('このパスワードリセットリンクは60分で有効期限が切れます。')
            ->line('もしこのリクエストに覚えがない場合、何もしないでください。');
    }
}
