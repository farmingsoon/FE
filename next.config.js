/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites(){
        return {
            beforeFiles: [
                {
                    source:"/ws/:path",
                    destination: "http://server.farmingsoon.site/ws/:path",
                }
            ]
        }
    },
    images : {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3.ap-northeast-2.amazonaws.com",
                port : "",
                pathname: '/farming-bucket/**',
            }
        ]
    }
}

module.exports = nextConfig
