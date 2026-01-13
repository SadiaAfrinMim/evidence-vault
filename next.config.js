const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // তোমার Next প্রজেক্টের রুট (এই ফাইল যেখানে আছে)
    root: path.join(__dirname),
  },
}

module.exports = nextConfig
