server "162.243.231.184", :app, :web, :db, :primary => true
set :deploy_to, "/var/deploy/capistrano/jigsaw"
set :branch,    "deploy"
set :scm_passphrase, ""
set :smart_lms_data_files, "#{deploy_to}/data/files"

