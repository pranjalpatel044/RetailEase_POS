package com.pranjal.billingsoftware.controller;

import com.pranjal.billingsoftware.io.OrderResponse;
import com.pranjal.billingsoftware.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dashboard")
public class DashboardController {

    private final OrderService orderService;

    // GET: /dashboard/recent-orders
    @GetMapping("/recent-orders")
    public List<OrderResponse> getRecentOrders() {
        return orderService.findRecentOrders(PageRequest.of(0, 10));
    }

    // GET: /dashboard/today-sales
//    @GetMapping("/today-sales")
//    public Map<String, Object> getTodaySalesData() {
//        LocalDate today = LocalDate.now();
//        Double totalSales = orderService.sumSalesByDate(today);
//        Long totalOrders = orderService.countByOrderDate(today);
//
//        return Map.of(
//                "date", today,
//                "totalSales", totalSales,
//                "totalOrders", totalOrders
//        );
//    }
}
