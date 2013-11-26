class Referral < ActiveRecord::Base

  belongs_to :offer
  belongs_to :user

  attr_accessible :user_id, :user_email, :offer_id, :email_subject, :short_url, :email_text
end
