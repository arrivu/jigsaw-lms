class AddTypeToWikipages < ActiveRecord::Migration
  def self.up
    add_column :wikipages, :type, :string
  end

  def self.down
    remove_column :wikipages, :type
  end
end
