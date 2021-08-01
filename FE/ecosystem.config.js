module.exports = {
  apps: [{
    name: "ListApp-FE",
    script: "app.js"
  }],
  deploy: {
    production: {
      key: "~/.ssh/jalex/jalex.pem",
      user: "ubuntu",
      host: ["ec2-35-178-75-202.eu-west-2.compute.amazonaws.com"],
      // SSH options with no command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      ssh_options: "StrictHostKeyChecking=no",
      ref: "origin/master",
      repo: "git@github.com:slater2k/ListApp.git",
      path: "/var/www/ListApp-test",
      // Pre-setup command or path to a script on your local machine
      // 'pre-setup': "./pm2/1pre-setup.sh",
      // Post-setup commands or path to a script on the host machine
      // eg: placing configurations in the shared dir etc
      // 'post-setup': "./pm2/2post-setup.sh",
      // pre-deploy action
      // 'pre-deploy-local': "./pm2/3pre-deploy-local",
      // post-deploy action
      // 'post-deploy': "./pm2/post-deploy",
    },
  }
}
