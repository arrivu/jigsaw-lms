class CreateReferrerCoupon < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :referrer_coupon do |t|
      t.string :status
      t.text :coupon_code
      t.string :expiry_date
      t.timestamps
    end
  end

  def self.down
    drop_table :referrer_coupon
  end
end
