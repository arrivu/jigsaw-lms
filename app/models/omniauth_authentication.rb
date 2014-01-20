class OmniauthAuthentication < ActiveRecord::Base
  attr_accessible :provider, :token, :uid, :user_id
  belongs_to :user
end
