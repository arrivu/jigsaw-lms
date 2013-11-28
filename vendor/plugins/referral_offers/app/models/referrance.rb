class Referrance < ActiveRecord::Base

  belongs_to :referral
  belongs_to :referral_provider

  attr_accessible :visit_count, :unique_url_token, :referree_email, :status
end
