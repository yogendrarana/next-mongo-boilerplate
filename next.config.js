const withMDX = require("@next/mdx")();

module.exports = withMDX({
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    experimental: {
        mdxRs: true
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com"
            }
        ],
        unoptimized: true
    }
});
