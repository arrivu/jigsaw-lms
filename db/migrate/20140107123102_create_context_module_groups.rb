class CreateContextModuleGroups < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    create_table :context_module_groups do |t|
      t.integer :context_id , :limit => 8
      t.string :context_type
      t.text :name
      t.integer :position
      t.string :workflow_state
      t.timestamps
    end
  end

  def self.down
    drop_table :context_module_groups
  end
end
