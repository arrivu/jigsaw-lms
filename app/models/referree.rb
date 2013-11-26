class Referree < ActiveRecord::Base

  belongs_to :referral


  attr_accessible :email, :name, :phone, :referral_id, :referral_email, :status, :coupon_code, :expiry_date
end
