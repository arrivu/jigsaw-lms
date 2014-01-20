class CreateReferrees < ActiveRecord::Migration
  tag :predeploy
  def self.up
    create_table :referrees do |t|
      t.text :email
      t.text :name
      t.references :reference, :limit => 8
      t.references :coupon, :limit => 8
      t.text :status
      t.datetime :expiry_date
      t.text :referral_email
      t.text :coupon_code
      t.timestamps
    end
  end

  def self.down
    drop_table :referrees
  end
end
