require "#{Rails.root}/vendor/plugins/dashboard/lib/sfu/stats/routing"
ActionController::Routing::Routes.draw do |map|
  map.stats_urls
end
