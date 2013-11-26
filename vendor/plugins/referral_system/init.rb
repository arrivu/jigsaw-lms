# Include hook code here

require_dependency 'referral_system'

# Should run with each request
config.to_prepare do
  REFERRAL::Offers::initialize
end
