class CreateComments < ActiveRecord::Migration
  tag :postdeploy
  def self.up
    create_table :comments do |t|
      t.string :title, :default => ""
      t.text :comment, :default => ""
      t.references :commentable, :limit => 8, :polymorphic => true
      t.references :user, :limit => 8
      t.timestamps
    end

    add_index :comments, :commentable_type
    add_index :comments, :commentable_id
    add_index :comments, :user_id
  end

  def self.down
    drop_table :comments
  end
end
