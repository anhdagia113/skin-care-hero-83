
package com.skincare.repository;

import com.skincare.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findByNameContainingIgnoreCase(String name);
    
    @Query("SELECT s FROM Service s WHERE LOWER(s.description) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<Service> findByDescriptionContaining(String keyword);
    
    @Query("SELECT s FROM Service s ORDER BY s.price ASC")
    List<Service> findAllOrderByPriceAsc();
    
    @Query("SELECT s FROM Service s ORDER BY s.price DESC")
    List<Service> findAllOrderByPriceDesc();
}
