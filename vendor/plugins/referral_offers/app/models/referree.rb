class Referree < ActiveRecord::Base

  belongs_to :referral
  belongs_to :referrance
  has_one :coupon


  attr_accessible :email, :name, :phone, :referral_email, :status, :coupon_code, :expiry_date
end


