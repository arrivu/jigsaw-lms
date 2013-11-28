class CreateReferrances < ActiveRecord::Migration
  tag :predeploy
  def self.up
    create_table :referrances do |t|
      t.references :referral, :limit => 8
      t.references :referral_provider, :limit => 8
      #t.numeric :referral_id, :limit => 8
      #t.numeric :provider_id, :limit => 8
      t.integer :visit_count
      t.text :unique_url_token
      t.email :referree_email
      t.text :status

      t.timestamps
    end
  end

  def self.down
    drop_table :referrances
  end
end
