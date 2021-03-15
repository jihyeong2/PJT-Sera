package com.ssafy.sera.Service;

import com.ssafy.sera.Domain.User;
import com.ssafy.sera.Domain.UserDto;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

@Service
public class JwtService {
    public static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    private String signature = "SERA_TOKEN";
    private Long EXPIRE = 30L;

    /**
     *  토큰 생성부
     * @param user 로그인 정보
     * @return jwt 토큰
     */
    public String create(User user){
        JwtBuilder jwtBuilder = Jwts.builder();

        jwtBuilder.setHeaderParam("typ", "JWT");
        jwtBuilder.setSubject("LoginToken")
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*EXPIRE))
                .claim("user",user).claim("greeting","환영합니다." + user.getUserNickname());
        jwtBuilder.signWith(SignatureAlgorithm.HS256, signature.getBytes());

        String jwt = jwtBuilder.compact();
        logger.info("jwt : {}",jwt);
        return jwt;
    }

    /**
     * 토큰 검증부
     * @param jwt
     */
    public void checkTokenValid(String jwt){
        Jwts.parser().setSigningKey(signature.getBytes()).parseClaimsJws(jwt);
    }

    /**
     * 토큰 정보추출부
     * @param jwt
     * @return
     */
    public Map<String, Object> getInfo(String jwt){
        Jws<Claims> claimsJws = null;
        try{
            claimsJws = Jwts.parser().setSigningKey(signature.getBytes()).parseClaimsJws(jwt);
        }catch(final Exception e){
            throw new RuntimeException();
        }
        logger.info("claims : {}", claimsJws);
        return claimsJws.getBody();
    }
}
