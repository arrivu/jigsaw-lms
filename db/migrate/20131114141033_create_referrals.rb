class CreateReferrals < ActiveRecord::Migration
  tag :predeploy
  def self.up
    create_table :referrals do |t|
      t.integer :user_id, :limit => 8
      #t.email :referrer_email
      t.numeric :offer_id, :limit => 8
      t.text :email_subject
      t.text :email_text
      t.text :short_url


      t.timestamps
    end
  end

  def self.down
    drop_table :referrals
  end
end
