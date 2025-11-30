package com.pranjal.billingsoftware.controller;

import com.pranjal.billingsoftware.io.OrderResponse;
import com.pranjal.billingsoftware.io.PaymentRequest;
import com.pranjal.billingsoftware.io.PaymentVerificationRequest;
import com.pranjal.billingsoftware.io.RazorpayOrderResponse;
import com.pranjal.billingsoftware.service.OrderService;
import com.pranjal.billingsoftware.service.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    private RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException{
       return  razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request){
       return orderService.verifyPayment(request);
    }
}
