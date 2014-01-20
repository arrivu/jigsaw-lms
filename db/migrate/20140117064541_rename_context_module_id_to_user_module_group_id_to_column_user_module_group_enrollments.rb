class RenameContextModuleIdToUserModuleGroupIdToColumnUserModuleGroupEnrollments < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    rename_column :user_module_group_enrollments, :context_module_id, :context_module_group_id
  end

  def self.down
    rename_column :user_module_group_enrollments, :context_module_group_id, :context_module_id
  end
end
