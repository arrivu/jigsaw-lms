server "162.243.117.179", :app, :web, :db, :primary => true
set :deploy_to, "/var/deploy/capistrano/canvas"
set :branch,    "develop"
set :scm_passphrase, ""
set :smart_lms_data_files, "#{deploy_to}/data/files"

