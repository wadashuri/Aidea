<?php

namespace App\Http\Controllers\Subscription;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SubscriptionController extends Controller
{
    /**
     * サブスクリプション登録
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
    
        $paymentMethod = $request->payment_method;
    
        $user->createOrGetStripeCustomer();
        $user->updateDefaultPaymentMethod($paymentMethod);
    
        $subscription = $user->newSubscription('default', 'prod_RbqTfKKmUhKFJ7')->create($paymentMethod);
    
        return response()->json(['status' => 'success', 'subscription' => $subscription]);
    }
}
