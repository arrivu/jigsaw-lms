class Referral < ActiveRecord::Base

  belongs_to :reward
  belongs_to :pseudonym
  has_many :references
  has_many :messages

  attr_accessible :pseudonym_id, :email_subject,  :email_text,  :referral_emails,:reward_id
  cattr_accessor :referral_id
  validates_presence_of :email_subject, :email_text


end
