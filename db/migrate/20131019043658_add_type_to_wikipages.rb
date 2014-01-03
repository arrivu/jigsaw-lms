class AddTypeToWikipages < ActiveRecord::Migration
  tag :predeploy
  def self.up
      add_column :wiki_pages, :wiki_type, :string
  end

  def self.down
    remove_column :wiki_pages, :wiki_type
  end

end
