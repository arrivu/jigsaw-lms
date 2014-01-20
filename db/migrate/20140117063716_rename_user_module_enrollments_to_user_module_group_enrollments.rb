class RenameUserModuleEnrollmentsToUserModuleGroupEnrollments < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    rename_table :user_module_enrollments, :user_module_group_enrollments
  end

  def self.down
    rename_table :user_module_group_enrollments, :user_module_enrollments
  end
end
