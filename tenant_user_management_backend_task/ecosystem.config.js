module.exports = {
    apps: [{
        name: "task",
        watch : true,
        script: "./index.js",
        env: {
            NODE_ENV: "local",
            PORT : 4000
        }
    }]
}