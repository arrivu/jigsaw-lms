class ReferralProvider < ActiveRecord::Base
  attr_accessible :name, :status
  has_many :referrals

  validates_presence_of :provider_name, :presence => true
end
