package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;



@Entity
public class BaseballRecord {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 private String date;
 private String homeTeam;
 private String awayTeam;
 private String result;
 private String memo;


 public Long getId() { return id; }
 public String getDate() { return date; }
 public String getHomeTeam() { return homeTeam; }
 public String getAwayTeam() { return awayTeam; }
 public String getResult() { return result; }
 public String getMemo() { return memo; }
 
 
 public void setId(Long id) { this.id = id; }
 public void setDate(String date) { this.date = date; }
 public void setHomeTeam(String homeTeam) { this.homeTeam = homeTeam; }
 public void setAwayTeam(String awayTeam) { this.awayTeam = awayTeam; }
 public void setResult(String result) { this.result = result; }
 public void setMemo(String memo) { this.memo = memo; }
}