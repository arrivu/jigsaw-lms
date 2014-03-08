class CreateTermsAndConditions < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    create_table :terms_and_conditions do |t|
      t.integer :account_id,:limit => 8
      t.text :terms_and_conditions
    end
  end

  def self.down
    drop_table :terms_and_conditions
  end
end
