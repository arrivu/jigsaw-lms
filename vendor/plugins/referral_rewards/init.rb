# Include hook code here
require_dependency 'referral_rewards'
# Should run with each request
config.to_prepare do
  Referrals::Rewards::initialize
end
