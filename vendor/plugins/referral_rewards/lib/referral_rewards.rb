# Referral-system

require 'referral/rewards/routing'

Dir.glob(File.join(File.dirname(__FILE__), "db", "migrate", "*")).each do |file|
  require file
end

module Referrals
  module Rewards
    def self.initialize
      true
    end
  end
end
