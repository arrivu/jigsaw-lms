class TermsAndCondition < ActiveRecord::Base

  attr_accessible :terms_and_conditions
  belongs_to :account

end
