class UserModuleGroupEnrollment < ActiveRecord::Base

  ACTIVE = "active"
  DELETED = "deleted"

  belongs_to :user
  belongs_to :context_module

  scope :active, where(:workflow_state => ACTIVE)
  scope :deleted, where(:workflow_state => DELETED)



end
