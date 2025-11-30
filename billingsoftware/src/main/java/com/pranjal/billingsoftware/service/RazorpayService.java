package com.pranjal.billingsoftware.service;

import com.pranjal.billingsoftware.io.RazorpayOrderResponse;
import com.razorpay.RazorpayException;
import org.springframework.stereotype.Service;

@Service
public interface RazorpayService {

   RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;

}
