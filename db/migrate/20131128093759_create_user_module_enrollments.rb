class CreateUserModuleEnrollments < ActiveRecord::Migration
  tag :predeploy
  def self.up
    create_table :user_module_enrollments do |t|
      t.belongs_to :user ,:limit => 8
      t.belongs_to :context_module,:limit => 8
      t.string :workflow_state
      t.timestamps
    end
  end

  def self.down
    drop_table :user_module_enrollments
  end
end
