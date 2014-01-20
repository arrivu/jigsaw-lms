class ReferralProvider < ActiveRecord::Base
  attr_accessible :name, :status
  has_many :referrals

  validates_presence_of :name

  FACEBOOK ='facebook'
  GOOGLE ='google'
  TWITTER ='twitter'
  LINKEDIN ='linkedin'
  GLOBAL  = 'global'
  EMAIL = 'email'

end
