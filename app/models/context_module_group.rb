class ContextModuleGroup < ActiveRecord::Base
  include Workflow
  attr_accessible :context_id, :context_type ,:position ,:name,:workflow_state
  belongs_to :context, :polymorphic => true
  has_many :context_module_group_associations, :dependent => :destroy, :order => 'context_module_group_associations.position'
  acts_as_list :scope => :context
  before_save :infer_position
  validates_presence_of :workflow_state, :context_id, :context_type
  after_save :touch_context

  DEFAULT_MODULE_GROUP_NAME = "Default class group"

  scope :default, where(:is_default => true)
  scope :active, where(:workflow_state => 'active')
  scope :unpublished, where(:workflow_state => 'unpublished')
  scope :not_deleted, where("context_module_groups.workflow_state<>'deleted'")

  def self.module_group_positions(context)
    # Keep a cached hash of all module groups for a given context and their

    Rails.cache.fetch(['module_group_positions', context].cache_key) do
      hash = {}
      context.context_module_groups.not_deleted.each{|m| hash[m.id] = m.position || 0 }
      hash
    end
  end

  def infer_position
    if !self.position
      positions = ContextModuleGroup.module_group_positions(self.context)
      if max = positions.values.max
        self.position = max + 1
      else
        self.position = 1
      end
    end
    self.position
  end

  workflow do
    state :active do
      event :unpublish, :transitions_to => :unpublished
    end
    state :unpublished do
      event :publish, :transitions_to => :active
    end
    state :deleted
  end




end
