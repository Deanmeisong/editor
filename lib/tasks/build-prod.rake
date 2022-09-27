desc "build prod"
task :build_prod do
  sh "rails assets:precompile"
  sh "echo 'Modify prod config with time utc'"
  sh "ed config/environments/production.rb <build_prod/config-prod.ed"
  sh "echo 'Modify admin index with build timestamp'"
  sh "ed app/views/admin/index.html.erb <build_prod/admin-index.ed"
  sh "echo rm node_modules"
  sh "rm -rf node_modules"
  sh "echo rm tests"
  sh "rm -rf test"
  sh "echo clear logs"
  sh "rails log:clear"
  sh "echo remove git files"
  sh "rm -rf .git"
  sh "rm -rf .github"
  sh "rm -rf .gitignore"
  puts "Ready to tar"
end

