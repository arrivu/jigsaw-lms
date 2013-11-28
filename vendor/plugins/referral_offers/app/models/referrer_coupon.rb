class ReferrerCoupon < ActiveRecord::Base

  belongs_to :referral
  belongs_to :referree
  has_one :coupon

  attr_accessible :status, :coupon_code, :expiry_date
end


