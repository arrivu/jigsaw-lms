class ContextModuleGroupAssociation < ActiveRecord::Base
  belongs_to :context_module_group
  belongs_to :context_module

  acts_as_list :scope => :context_module_group

  #before_save :infer_position
  attr_accessible :context_module_id,:context_module_group_id, :position
  validates_presence_of :context_module_id,:context_module_group_id, :position


  def self.module_group_association_positions(context)
    # Keep a cached hash of all module groups association for a given context and their

    Rails.cache.fetch(['module_group_association_positions', context].cache_key) do
      hash = {}
      context.context_module_group_associations.each{|m| hash[m.id] = m.position || 0 }
      hash
    end
  end

  def self.infer_position(context_module_association)
    if !context_module_association.position
      positions = ContextModuleGroupAssociation.module_group_association_positions(context_module_association.context_module_group)
      if max = positions.values.max
        context_module_association.position = max + 1
      else
        context_module_association.position = 1
      end
    end
    context_module_association.position
  end

end
