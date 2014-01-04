class ChangeReferrerCouponReferencesReferralToReference < ActiveRecord::Migration
  tag :predeploy
  def self.up
    remove_column :referrer_coupons, :referral_id
    add_column :referrer_coupons, :reference_id, :integer, :limit => 8
  end

  def self.down
    remove_column :referrer_coupons, :reference_id
    add_column :referrer_coupons, :referral_id, :integer, :limit => 8
  end
end
