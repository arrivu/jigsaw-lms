class AddColumnToPseudonyms < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    add_column :pseudonyms, :settings,:text
  end

  def self.down
    remove_column :pseudonyms, :settings,:text
  end
end
