class CreateReferrees < ActiveRecord::Migration
  tag :predeploy
  def self.up
    create_table :referrees do |t|
      t.email :email
      t.text :name
      t.integer :phone
      t.numeric :referral_id, :limit => 8
      t.email :referral_email
      t.text :status
      t.text :coupon_code
      t.datetime :expiry_date

      t.timestamps
    end
  end

  def self.down
    drop_table :referrees
  end
end
