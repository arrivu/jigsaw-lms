class CreateOmniauthAuthentications < ActiveRecord::Migration
  tag :predeploy
  def self.up
    create_table :omniauth_authentications do |t|
      t.integer :user_id ,:limit => 8
      t.string :provider
      t.string :uid
      t.string :token
      t.timestamps
    end
  end

  def self.down
    drop_table :omniauth_authentications
  end
end
