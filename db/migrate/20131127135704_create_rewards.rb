class CreateRewards < ActiveRecord::Migration
  tag :predeploy
  def self.up
    create_table :rewards do |t|
      t.text :name
      t.text :description
      t.date :expiry_date
      t.integer :how_many
      t.integer :referrer_amount
      t.integer :referrer_percentage
      t.date :referrer_expiry_date
      t.integer :referree_amount
      t.integer :referree_percentage
      t.date :referree_expiry_date
      t.text :email_subject
      t.text :email_template_txt
      t.text :alpha_mask
      t.text :metadata
      t.text :metadata_type
      t.text :status
      t.references :account, :limit => 8
      t.references :pseudonym, :limit => 8

      t.timestamps
    end
    add_index :rewards, [:metadata, :metadata_type, :status], :unique => false, :name => 'metadata_metadata_type_status'
  end

  def self.down
    drop_table :rewards
  end

end
