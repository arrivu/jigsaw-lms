# Referral-system

require 'referral/offers/routing'

Dir.glob(File.join(File.dirname(__FILE__), "db", "migrate", "*")).each do |file|
  require file
end

module Referral
  module Offers
    def self.initialize
      true
    end
  end
end
