/** @type {import('next').NextConfig} */

const nextConfig = {
    // async rewrites(){
    //     return [
    //         {
    //             source:"/ws",
    //             destination: "https://server.farmingsoon.site/ws",
    //         }
    //     ]
    // },
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
