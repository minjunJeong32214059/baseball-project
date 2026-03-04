package com.example.demo.controller;

import com.example.demo.entity.BaseballRecord;
import com.example.demo.repository.BaseballRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // JSON 데이터를 주고받는 API 서버임을 선언
@RequestMapping("/api/records") // 주소창에 /api/records로 접속하면 이 컨트롤러가 작동함
@CrossOrigin(origins = "http://localhost:3000") // 중요! 나중에 React(3000번 포트)의 접근을 허용함
public class BaseballRecordController {

    @Autowired
    private BaseballRecordRepository repository;

    // 1. 모든 직관 기록 가져오기 (GET)
    @GetMapping
    public List<BaseballRecord> getAllRecords() {
        return repository.findAll();
    }

    // 2. 직관 기록 저장하기 (POST)
    @PostMapping
    public BaseballRecord createRecord(@RequestBody BaseballRecord record) {
        return repository.save(record);
    }

    // 3. 기록 삭제하기 (DELETE)
    @DeleteMapping("/records/{id}")
    public void deleteRecord(@PathVariable Long id) {
        repository.deleteById(id);
    }
}