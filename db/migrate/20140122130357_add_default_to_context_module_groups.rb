class AddDefaultToContextModuleGroups < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    add_column :context_module_groups, :is_default, :boolean, :default => false
  end

  def self.down
    remove_column :context_module_groups, :is_default
  end
end
