class AddColumnPhoneToReferee < ActiveRecord::Migration
#For some reason the create table doesn't like bigint.
  tag :predeploy
  def self.up
    add_column :referrees, :phone, :bigint
  end

  def self.down
    remove_column :referrees, :phone, :bigint
  end
end
