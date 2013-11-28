class Offer < ActiveRecord::Base
  attr_accessible  :name, :description, :expiry_date, :how_many,
                   :referrer_amount, :referrer_percentage, :referrer_expiry_date,
                   :referree_amount, :referree_percentage, :referree_expiry_date,
                   :email_subject, :email_template_txt, :alpha_mask, :metadata,
                   :status

  belongs_to :course
  belongs_to :account
  belongs_to :pseudonym
  has_many :referrals

  validates_presence_of :name, :presence => true
  validates_presence_of :description, :presence => true
  #validates_presence_of :expiry_date, :presence => true
  validates_presence_of :how_many, :presence => true
  validates_presence_of :referrer_expiry_date, :presence => true
  validates_presence_of :referree_expiry_date, :presence => true
  validates_presence_of :email_subject, :presence => true
  validates_presence_of :email_template_txt, :presence => true
  validates_presence_of :alpha_mask, :presence => true
  #validates_presence_of :metadata, :presence => true

end


