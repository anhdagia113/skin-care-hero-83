
package com.skincare.repository;

import com.skincare.model.Customer;
import com.skincare.model.SkinTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkinTestRepository extends JpaRepository<SkinTest, Long> {
    List<SkinTest> findByCustomerOrderByCreatedAtDesc(Customer customer);
}
