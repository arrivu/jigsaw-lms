module REFERRAL #:nodoc:
  module Offers #:nodoc:
    module Routing #:nodoc:
      module MapperExtensions

        #def offer_urls
        #  @set.add_route("/referral/offers/new", {:controller => "offers", :action => "new"})
          #@set.add_route("/sfu/stats/restricted", {:controller => "stats", :action => "restricted"})
          #@set.add_route("/sfu/stats/courses/:term_id.:format", {:controller => "stats", :action => "courses"})
          #@set.add_route("/sfu/stats/enrollments/:term_id.:format", {:controller => "stats", :action => "enrollments"})
        #end

      end
    end
  end
end

ActionController::Routing::RouteSet::Mapper.send :include, REFERRAL::Offers::Routing::MapperExtensions