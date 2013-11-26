class CreateOffers < ActiveRecord::Migration
  tag :predeploy
  def self.up
    create_table :offers do |t|
      t.text :name
      t.text :description
      t.datetime :expiry_date
      t.integer :how_many
      t.integer :referrer_amount
      t.integer :referrer_percentage
      t.integer :referree_amount
      t.integer :referree_percentage
      t.text :email_subject
      t.text :email_template_txt
      t.text :alpha_mask
      t.text :metadata
      t.datetime :referrar_expiry_date
      t.integer :account_id, :limit => 8
      t.integer :user_id, :limit => 8
      t.integer :pseudonym_id, :limit => 8

      t.timestamps
    end
  end

  def self.down
    drop_table :offers
  end
end
