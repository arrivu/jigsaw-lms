class ReferrerCoupon < ActiveRecord::Base

  belongs_to :reference
  belongs_to :referree
  has_one :coupon

  attr_accessible :status, :coupon_code, :expiry_date,:referral_id, :referree_id, :coupon_id

  STATUS_WAIT_FOR_ENROLL = 'Waiting for enroll'
  STATUS_ACTIVE = 'active'
  STATUS_COMPLETE = 'complete'

  scope :active, where(status: STATUS_ACTIVE)

end


