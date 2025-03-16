
package com.skincare.repository;

import com.skincare.model.Feedback;
import com.skincare.model.Service;
import com.skincare.model.Therapist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByService(Service service);
    
    List<Feedback> findByTherapist(Therapist therapist);
    
    List<Feedback> findByServiceAndIsPublic(Service service, Boolean isPublic);
    
    List<Feedback> findByTherapistAndIsPublic(Therapist therapist, Boolean isPublic);
}
