class OmniauthAuthentication < ActiveRecord::Base
  attr_accessible :provider, :token, :uid, :user_id
  belongs_to :user

  PROVIDER_FACEBOOK = "facebook"
  PROVIDER_LINKEDIN = "linkedin"
  PROVIDER_GOOGLE = "google"

  OMNIAUTH_PROVIDERS = [PROVIDER_FACEBOOK,PROVIDER_LINKEDIN,PROVIDER_GOOGLE]


end
