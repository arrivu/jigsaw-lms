class Offer < ActiveRecord::Base

  belongs_to :course
  has_many :user

end
