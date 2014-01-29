class AddMainNavigationToContextExternalTools < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    add_column :context_external_tools, :has_main_navigation, :boolean , :default => false
  end

  def self.down
    remove_column :context_external_tools, :has_main_navigation
  end
end
