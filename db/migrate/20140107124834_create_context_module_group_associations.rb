class CreateContextModuleGroupAssociations < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    create_table :context_module_group_associations do |t|
      t.references :context_module_group, :limit => 8
      t.references :context_module, :limit => 8
      t.integer :position
      t.timestamps
    end
  end

  def self.down
    drop_table :context_module_group_associations
  end
end
