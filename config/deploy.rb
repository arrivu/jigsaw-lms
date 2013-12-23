require "bundler/capistrano"
require "capistrano/ext/multistage"
#require 'capistrano/maintenance'

# change the default filename from maintenance.html to disabled.html
#set :maintenance_basename, 'disabled'

# change default directory from default of #{shared_path}/system
#set :maintenance_dirname, "#{shared_path}/public/system"

# use local template instead of included one with capistrano-maintenance
#set :maintenance_template_path, 'app/views/maintenance.html.erb'

# disable the warning on how to configure your server
#set :maintenance_config_warning, false

#set :application,   "jigsaw-lms"
set :user,    "sysadmin"
set :passenger_user,"canvasuser"
ssh_options[:port] = 2002
set :stages, ["staging", "production"]
set :default_stage, "production"
set :repository,    "http://github.com/m-narayan/jigsaw-lms.git"
set :scm,     :git
set :deploy_via,  :remote_cache
set :branch,        "deploy"
set :deploy_to,     "/var/deploy/capistrano/jigsaw"
set :use_sudo,      true
set :deploy_env,    "production"
#set :bundle_dir,    "/var/data/gems"
set :bundle_without, [:sqlite]
set :bundle_flags, "--deployment --binstubs"

set :server_base_url, "www.jigsawacademy.net"
#set me for future
def is_hotfix?
  ENV.has_key?('hotfix') && ENV['hotfix'].downcase == "true"
end

disable_log_formatters;

default_run_options[:pty] = true
ssh_options[:forward_agent] = true
#ssh_options[:keys] = [File.join(ENV["HOME"], ".ssh", "id_rsa.pub")]

set :rake, "#{rake} --trace"
set :bundle_without, []
#set :bundle_without, [:development, :test]

task :uname do
  run 'uname -a'
end

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    sudo "touch #{File.join(current_path,'tmp','restart.txt')}"
  end

  task :cleanup, :except => { :no_release => true } do
    count = fetch(:keep_releases, 5).to_i
    sudo "ls -1dt #{releases_path}/* | tail -n +#{count + 1} | xargs rm -rf"
  end
end
# Canavs-specific task after a deploy
namespace :canvas do
  desc "Make sure local git is in sync with remote."
  task :check_revision, roles: :web do
    unless `git rev-parse HEAD` == `git rev-parse origin/#{branch}`
      puts "WARNING: HEAD is not the same as origin/#{branch}"
      puts "Run `git push` to sync changes."
      exit
    end
  end

  # LOCAL COMMANDS
  desc "Update the deploy branch of the local repo"
  task :update do
    stashResponse = run_locally "git stash"
    puts stashResponse
    puts run_locally "bundle install"  #--path path=~/gems"
    puts run_locally "git add Gemfile.lock"
    puts run_locally "git commit --allow-empty Gemfile.lock -m 'Add Gemfile.lock for deploy #{release_name}'"
    puts run_locally "git push origin"
    puts run_locally "git stash pop" unless stashResponse == "No local changes to save\n"
    puts "\x1b[42m\x1b[1;37m Push sucessful. You should now run cap deploy and cap canvas:update_remote \x1b[0m"
  end

  # REMOTE COMMANDS

  # On every deploy
  desc "Create symlink for files folder to mount point"
  task :copy_config do
    folder = 'tmp/files'
    run "#{sudo} ln -nfs #{release_path}/ #{current_path}"
    run "ln -nfs #{shared_path}/files-store #{latest_release}/#{folder}"
    run "ln -nfs #{shared_path}/config/cache_store.yml #{release_path}/config/cache_store.yml"
    run "ln -nfs #{shared_path}/config/database.yml #{release_path}/config/database.yml"
    run "ln -nfs #{shared_path}/config/delayed_jobs.yml #{release_path}/config/delayed_jobs.yml"
    run "ln -nfs #{shared_path}/config/domain.yml #{release_path}/config/domain.yml"
    run "ln -nfs #{shared_path}/config/file_store.yml #{release_path}/config/file_store.yml"
    run "ln -nfs #{shared_path}/config/outgoing_mail.yml #{release_path}/config/outgoing_mail.yml"
    run "ln -nfs #{shared_path}/config/redis.yml #{release_path}/config/redis.yml"
    run "ln -nfs #{shared_path}/config/security.yml #{release_path}/config/security.yml"
    run "ln -nfs #{shared_path}/config/logging.yml #{release_path}/config/logging.yml"

  end


  desc "Compile static assets"
  task :compile_assets do
    # On remote: bundle exec rake canvas:compile_assets
    run "cd #{latest_release} && bundle exec #{rake} RAILS_ENV=#{rails_env} canvas:compile_assets[false]"
    # run "cd #{latest_release} && chown -R #{passenger_user}:#{passenger_user} ."
  end

  desc "Load new notification types"
  task :load_notifications, :roles => :db, :only => { :primary => true } do
    # On remote: RAILS_ENV=production bundle exec rake db:load_notifications
    run "cd #{latest_release} && #{rake} RAILS_ENV=#{rails_env} db:load_notifications --quiet"
  end

  desc "Restarted delayed jobs workers"
  task :restart_jobs, :on_error => :continue do
    sudo "touch #{current_path}/tmp/restart.txt"
    # On remote: /etc/init.d/canvas_init restart
    sudo "/etc/init.d/canvas_init restart"
  end

  desc "Tasks that run before create_symlink"
  task :before_create_symlink do
    copy_config
    compile_assets
    clone_qtimigrationtool
  end

  desc "change permission to passenger_user "
  task :canvasuser_permission do
    sudo "mkdir -p #{current_path}/log"
    sudo "mkdir -p #{current_path}/tmp/pids"
    sudo "mkdir -p #{current_path}/public/assets"
    sudo "mkdir -p #{current_path}/public/stylesheets/compiled"
    sudo "touch Gemfile.lock"
    sudo "chown -R #{passenger_user} #{current_path}/config/environment.rb"
    sudo "chown -R #{passenger_user} #{current_path}/log"
    sudo "chown -R #{passenger_user} #{current_path}/tmp"
    sudo "chown -R #{passenger_user} #{current_path}/public/assets"
    sudo "chown -R  #{passenger_user} #{current_path}/public/stylesheets/compiled"
    sudo "chown -R  #{passenger_user} #{current_path}/Gemfile.lock"
    sudo "chown -R  #{passenger_user} #{current_path}/config.ru"
    sudo "chown -R  #{passenger_user} #{current_path}"
  end

  desc "Clone QTIMigrationTool"
  task :clone_qtimigrationtool do
    run "cd #{latest_release}/vendor && git clone https://github.com/instructure/QTIMigrationTool.git QTIMigrationTool && chmod +x QTIMigrationTool/migrate.py"
  end

  desc "Tasks that run after create_symlink"
  task :after_create_symlink do
    canvasuser_permission
    deploy.migrate unless is_hotfix?
    load_notifications unless is_hotfix?
  end

  desc "Tasks that run after the deploy completes"
  task :after_deploy do
    restart_jobs
    puts "\x1b[42m\x1b[1;37m Deploy complete!  \x1b[0m"
  end
end
# Add this to add the `deploy:ping` task:
namespace :deploy do
  task :ping do
    system "curl --silent #{fetch(:ping_url)}"
  end
end

before(:deploy, "canvas:check_revision")
before(:deploy, "deploy:web:disable") unless is_hotfix?
before("deploy:create_symlink", "canvas:before_create_symlink")
after("deploy:create_symlink", "canvas:after_create_symlink")
after(:deploy, "canvas:after_deploy")
after(:deploy, "deploy:cleanup")
after(:deploy, "deploy:web:enable") unless is_hotfix?
# Add this to automatically ping the server after a restart:
# cap bundle:install            # Install the current Bundler environment.
# cap canvas:check_user         # Make sure that only the deploy user can run certain tasks
# cap canvas:compile_assets     # Compile static assets
# cap canvas:do_check_user      # Make sure that only the deploy user can run certain tasks
# cap canvas:files_symlink      # Create symlink for files folder to mount point
# cap canvas:load_notifications # Load new notification types
# cap canvas:restart_jobs       # Restarted delayed jobs workers
# cap canvas:update             # Update the deploy branch of the local repo
# cap canvas:update_gems        # Install new gems from bundle and push updates
# cap canvas:update_remote      # Post-update commands
# cap deploy                    # Deploys your project.
# cap deploy:check              # Test deployment dependencies.
# cap deploy:check_revision     # Make sure local git is in sync with remote.
# cap deploy:cleanup            # Clean up old releases.
# cap deploy:cold               # Deploys and starts a `cold' application.
# cap deploy:create_symlink     # Updates the symlink to the most recently deployed version.

