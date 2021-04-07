package com.ssafy.sera.Service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;


@Service
@NoArgsConstructor
public class S3Service {
    private AmazonS3 s3Client;

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    @PostConstruct
    public void setS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);

        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(this.region)
                .build();
    }

    //파일 업로드
    public String upload(MultipartFile file) throws IOException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        Date time = new Date();
        String uploadName = sdf.format(time)+'_'+file.getOriginalFilename();

        s3Client.putObject(new PutObjectRequest(bucket, uploadName, file.getInputStream(), null)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return s3Client.getUrl(bucket, uploadName).toString(); //url반환
    }

    //파일 삭제
    public void delete(String url)  {
        String fileName = url.substring(url.lastIndexOf("/")+1);
        boolean isExistObject = s3Client.doesObjectExist(bucket, fileName);

        if (isExistObject == true) {
            s3Client.deleteObject(bucket, fileName);
        }
    }
}