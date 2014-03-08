class CreateLiveClassLinks < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    create_table :live_class_links do |t|
      t.belongs_to :course ,:limit => 8
      t.belongs_to :context_module ,:limit => 8
      t.belongs_to :course_section ,:limit => 8
      t.string :name
      t.text :link_url
      t.timestamps
    end
  end

  def self.down
    drop_table :live_class_links
  end
end
