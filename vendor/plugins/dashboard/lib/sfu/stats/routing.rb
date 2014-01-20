module SFU #:nodoc:
  module Stats #:nodoc:
    module Routing #:nodoc:
      module MapperExtensions

        def stats_urls
          @set.add_route("/graphs/stats", {:controller => "stats", :action => "index"})
          #@set.add_route("/graphs/stats/restricted", {:controller => "stats", :action => "restricted"})
          @set.add_route("/graphs/stats/courses/:term_id.:format", {:controller => "stats", :action => "courses"})
          @set.add_route("/graphs/stats/enrollments/:term_id.:format", {:controller => "stats", :action => "enrollments"})
          #@set.add_route("courses/:course_id/sections/:section_id/users", {:controller => "stats", :action => "show"})
          @set.add_route("courses/:course_id/sections/:section_id/statistics",{:controller => "gradebook2",:action =>"show" })

        end

       end
    end
  end
end

ActionController::Routing::RouteSet::Mapper.send :include, SFU::Stats::Routing::MapperExtensions
