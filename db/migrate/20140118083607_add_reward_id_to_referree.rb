class AddRewardIdToReferree < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    add_column :referrees, :reward_id, :integer, :limit => 8
  end

  def self.down
    remove_column :referrees, :reward_id
  end
end
