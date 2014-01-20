class CreateRedemptions < ActiveRecord::Migration
  tag :predeploy

  def self.up
    create_table :redemptions do |t|
      t.references :coupon,:limit => 8
      t.integer :pseudonym_id, :limit => 8
      t.string :transaction_id
      t.text :metadata
      t.timestamps
    end
  end


  def self.down
    drop_table :redemptions
  end
end
