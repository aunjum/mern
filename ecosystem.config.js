module.exports = {
  apps : [{
    name: "ettms-v2.1.0",
    script: 'npm start',
    log_date_format  : "YYYY-MM-DD HH:mm Z",
    watch: "./",
    watch_delay: 1000,
    ignore_watch : ["node_modules"],
  }]
};
