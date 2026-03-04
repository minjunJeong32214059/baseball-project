package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // 수동 생성자: 스프링이 자동으로 UserService를 주입해줍니다.
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 회원가입 API (리액트에서 요청을 보낼 주소입니다)
    @PostMapping("/join")
    public String join(@RequestBody User user) {
        userService.join(user);
        return "회원가입 완료!";
    }
}