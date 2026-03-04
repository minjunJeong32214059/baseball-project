package com.example.demo.repository;

import com.example.demo.entity.BaseballRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseballRecordRepository extends JpaRepository<BaseballRecord, Long> {
}