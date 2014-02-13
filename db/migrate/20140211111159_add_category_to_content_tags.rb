class AddCategoryToContentTags < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    add_column :content_tags, :category, :text,:default =>  "pre_class_reading_materials"
  end

  def self.down
    remove_column :content_tags, :category
  end
end
