/** @type {import('next').NextConfig} */

const nextConfig = {
    images : {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3.ap-northeast-2.amazonaws.com",
                port : "",
                pathname: '/farming-bucket/**',
            },
            {
                protocol: "https", // 카카오 CDN에 대한 설정을 추가
                hostname: "k.kakaocdn.net", // 카카오 CDN의 호스트 이름
                port: "",
                pathname: "/**", // 모든 경로에 대해 허용
            }
        ]
    }
}

module.exports = nextConfig
