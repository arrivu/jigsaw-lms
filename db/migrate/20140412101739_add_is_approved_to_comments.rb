class AddIsApprovedToComments < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    add_column :comments, :is_approved, :boolean ,default:  false
  end

  def self.down
    remove_column :comments, :is_approved
  end
end
