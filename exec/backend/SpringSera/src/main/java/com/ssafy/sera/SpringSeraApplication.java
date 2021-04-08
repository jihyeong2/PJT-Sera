package com.ssafy.sera;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.aws.autoconfigure.context.ContextRegionProviderAutoConfiguration;

@SpringBootApplication
public class SpringSeraApplication{

	public static void main(String[] args) {
		SpringApplication.run(SpringSeraApplication.class, args);
	}

}
