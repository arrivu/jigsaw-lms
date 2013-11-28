class Referral < ActiveRecord::Base

  belongs_to :offer
  belongs_to :pseudonym

  attr_accessible :email_subject,  :email_text, :short_url, #:referrer_email

  #validates_presence_of :referrer_email, :presence => true
  validates_presence_of :email_subject, :presence => true
  validates_presence_of :email_text, :presence => true
  validates_as_url :short_url

end
