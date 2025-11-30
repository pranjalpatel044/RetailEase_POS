package com.pranjal.billingsoftware.service;

import com.pranjal.billingsoftware.io.OrderRequest;
import com.pranjal.billingsoftware.io.OrderResponse;
import com.pranjal.billingsoftware.io.PaymentVerificationRequest;

import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrder();

    OrderResponse verifyPayment(PaymentVerificationRequest request);

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findRecentOrders(Pageable pageable);
}
