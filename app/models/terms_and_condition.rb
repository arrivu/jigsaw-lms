class TermsAndCondition < ActiveRecord::Base
  belongs_to :account

  attr_accessible :terms_and_conditions
end