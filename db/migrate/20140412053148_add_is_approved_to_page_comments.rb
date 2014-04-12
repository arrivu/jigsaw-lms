class AddIsApprovedToPageComments < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    add_column :page_comments, :is_approved, :boolean ,default:  false
  end

  def self.down
    remove_column :page_comments, :is_approved
  end
end
