module Referral #:nodoc:
  module Offers #:nodoc:
    module Routing #:nodoc:
      module MapperExtensions

        def referral_offers_urls
          #concern :referral_system do
          #  resources :offers do
          #  end
          #
          #  resources :referrals do
          #    match 'my-rewards' => 'referrals#my_rewards', :as => :my-rewards
          #  end
          #end
          #
          #scope(:controller => :courses) do
          #  concern :referral_system
          #end
          #
          #scope(:controller => :accounts) do
          #  concern :referral_system
          #end
        end
      end
    end
  end
end

ActionController::Routing::RouteSet::Mapper.send :include, Referral::Offers::Routing::MapperExtensions