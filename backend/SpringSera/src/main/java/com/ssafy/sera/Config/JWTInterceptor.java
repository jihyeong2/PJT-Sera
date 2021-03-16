package com.ssafy.sera.Config;

import com.ssafy.sera.Service.JwtService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class JWTInterceptor implements HandlerInterceptor {
    private final JwtService jwtService;
    public static final Logger logger = LoggerFactory.getLogger(JWTInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.info(request.getMethod() + " : " + request.getServletPath());

        if(request.getMethod().equals("OPTIONS")){
            return true;
        }else{
            String token = request.getHeader("auth-token");
            if(token != null && token.length() > 0){
                jwtService.checkTokenValid(token);
                logger.info("토큰 사용 가능 : {}", token);
                return true;
            }else{
                throw new RuntimeException("인증 토큰이 없습니다.");
            }
        }
    }
}
