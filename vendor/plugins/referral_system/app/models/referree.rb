class Referree < ActiveRecord::Base
  belongs_to :referral
  has_many :offers
end
