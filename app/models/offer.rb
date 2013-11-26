class Offer < ActiveRecord::Base

  belongs_to :course
  belongs_to :user
  has_many :referrals

  attr_accessible  :name, :description, :expiry_date, :how_many, :referrer_amount, :referrer_percentage, :referree_amount,
                    :referree_percentage, :email_subject, :email_template_txt, :alpha_mask, :metadata, :referrar_expiry_date,
                    :account_id, :user_id, :pseudonym_id

end
