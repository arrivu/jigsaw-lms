class Referrance < ActiveRecord::Base

  belongs_to :referral

  attr_accessible :referral_id, :provider_id, :visit_count, :unique_url_token, :referree_email, :status
end
