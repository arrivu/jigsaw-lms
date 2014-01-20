class CreateReferralProvider < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :referral_providers do |t|
      t.string :name
      t.string :status
      t.timestamps
    end
  end

  def self.down
    drop_table :referral_providers
  end
end
