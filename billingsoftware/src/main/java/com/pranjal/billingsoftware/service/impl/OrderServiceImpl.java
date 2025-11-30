package com.pranjal.billingsoftware.service.impl;

import com.pranjal.billingsoftware.entity.OrderEntity;
import com.pranjal.billingsoftware.entity.OrderItemEntity;
import com.pranjal.billingsoftware.io.*;
import com.pranjal.billingsoftware.repository.OrderEntityRepository;
import com.pranjal.billingsoftware.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderEntityRepository orderEntityRepository;

    @Override
    public OrderResponse createOrder(OrderRequest request) {
        OrderEntity newOrder = convertToOrderEntity(request);

        PaymentDetails paymentDetails = new PaymentDetails();
        if (newOrder.getPaymentMethod() == PaymentMethod.CASH) {
            paymentDetails.setStatus(PaymentDetails.PaymentStatus.COMPLETED);
        } else {
            paymentDetails.setStatus(PaymentDetails.PaymentStatus.PENDING);
        }
        newOrder.setPaymentDetails(paymentDetails);

        List<OrderItemEntity> orderItems = request.getCartItems().stream()
                .map(this::convertToOrderItemEntity)
                .collect(Collectors.toList());
        newOrder.setItems(orderItems);

        newOrder = orderEntityRepository.save(newOrder);
        return convertToResponse(newOrder);
    }

    private OrderItemEntity convertToOrderItemEntity(OrderRequest.OrderItemRequest item) {
        return OrderItemEntity.builder()
                .itemId(item.getItemId())
                .name(item.getName())
                .price(item.getPrice())
                .quantity(item.getQuantity())
                .build();
    }

    private OrderEntity convertToOrderEntity(OrderRequest request) {
        return OrderEntity.builder()
                .customerName(request.getCustomerName())
                .phoneNumber(request.getPhoneNumber())
                .subtotal(String.valueOf(request.getSubtotal()))
                .tax(request.getTax())
                .grandTotal(request.getGrandTotal())
                .paymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()))
                .build();
    }

    private OrderResponse.OrderItemResponse convertToItemResponse(OrderItemEntity orderItemEntity) {
        return OrderResponse.OrderItemResponse.builder()
                .itemId(orderItemEntity.getItemId())
                .name(orderItemEntity.getName())
                .price(orderItemEntity.getPrice())
                .quantity(orderItemEntity.getQuantity())
                .build();
    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
        return OrderResponse.builder()
                .orderId(newOrder.getOrderId())
                .customerName(newOrder.getCustomerName())
                .phoneNumber(newOrder.getPhoneNumber())
                .subtotal(Double.parseDouble(newOrder.getSubtotal()))
                .tax(newOrder.getTax())
                .grandTotal(newOrder.getGrandTotal())
                .createdAt(newOrder.getCreatedAt())
                .paymentMethod(newOrder.getPaymentMethod())
                .paymentDetails(newOrder.getPaymentDetails())
                .items(newOrder.getItems().stream()
                        .map(this::convertToItemResponse)
                        .collect(Collectors.toList()))
                .build();
    }

    @Override
    public void deleteOrder(String orderId) {
        OrderEntity existingOrder = orderEntityRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        orderEntityRepository.delete(existingOrder);
    }

    @Override
    public List<OrderResponse> getLatestOrder() {
        return orderEntityRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse verifyPayment(PaymentVerificationRequest request) {
        OrderEntity existingOrder = orderEntityRepository.findByOrderId(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!verifyRazorpaySignature(
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),
                request.getRazorpaySignature())) {
            throw new RuntimeException("Payment verification failed");
        }

        // Update payment status
        PaymentDetails paymentDetails = existingOrder.getPaymentDetails();
        paymentDetails.setStatus(PaymentDetails.PaymentStatus.COMPLETED);
        paymentDetails.setRazorpayOrderId(request.getRazorpayOrderId());
        paymentDetails.setRazorpayPaymentId(request.getRazorpayPaymentId());
        paymentDetails.setRazorpaySignature(request.getRazorpaySignature());

        existingOrder = orderEntityRepository.save(existingOrder);
        return convertToResponse(existingOrder);
    }

    @Override
    public Double sumSalesByDate(LocalDate date) {
        Double total = orderEntityRepository.sumSalesByDate(date);
        return total != null ? total : 0.0;
    }

    @Override
    public Long countByOrderDate(LocalDate date) {
        Long count = orderEntityRepository.countByOrderDate(date);
        return count != null ? count : 0L;
    }

    @Override
    public List<OrderResponse> findRecentOrders(Pageable pageable) {
        return orderEntityRepository.findRecentOrders(pageable)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private boolean verifyRazorpaySignature(String razorpayOrderId, String razorpayPaymentId,
            String razorpaySignature) {
        return true;
    }
}
