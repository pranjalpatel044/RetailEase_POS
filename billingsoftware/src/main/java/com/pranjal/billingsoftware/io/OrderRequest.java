package com.pranjal.billingsoftware.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest{

    private String customerName;
    private String phoneNumber;
    private String paymentMethod;
    private Double subtotal;
    private Double tax;
    private Double grandTotal;
    private List<OrderItemRequest> cartItems;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class OrderItemRequest {
        private String itemId;
        private String name;
        private Double price;
        private Integer quantity;
    }
}
