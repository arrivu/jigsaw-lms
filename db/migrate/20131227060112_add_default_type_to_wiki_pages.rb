class AddDefaultTypeToWikiPages < ActiveRecord::Migration
  tag :predeploy
  def self.up
    change_column :wiki_pages, :wiki_type, :string, :default => "wiki"
  end

  def self.down
    change_column :wiki_pages, :wiki_type, :string
  end
end
