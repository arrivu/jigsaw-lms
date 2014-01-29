class ContextModuleGroupsController < ApplicationController
  before_filter :require_context



  def reorder_items

    if authorized_action(@context.context_modules.new, @current_user, :update)
      #update context module group associations (case: dragged in different module group)
      @module_group = @context.context_module_groups.not_deleted.find(params[:context_module_group_id])
      orders = params[:order].split(",")
      ids =[]
      orders.each do |id|
        ids << id.to_i
      end
      cmga_ids = @module_group.context_module_group_associations.pluck(:context_module_id)

      affected_ids = ids - cmga_ids
      affected_ids.map do |affected_id|
        module_group_association = ContextModuleGroupAssociation.find_by_context_module_id(affected_id)
        module_group_association.update_attributes(context_module_group_id: params[:context_module_group_id])
      end

      respond_to do |format|
        format.json { render :json => @modules.to_json(:include => :content_tags, :methods => :workflow_state) }
      end
    end
  end


  def create
    if authorized_action(@context.context_modules.new, @current_user, :create)
     @context_module_group = ContextModuleGroup.new(:context_id=> @context.id, :context_type => @context.class.name,
                                                        :name => params[:context_module_group][:name],:workflow_state=> 'active')
     @context_module_group.save!
     @context_module_group.update_order([@context_module_group.id])
      redirect_to permission_groups_course_context_modules_url(@context)
   end
  end

  def edit
    @context_module_group = ContextModuleGroup.find(params[:context_module_group][:id])
    respond_to do |format|
      if  @context_module_group.update_attributes(params[:context_module_group])
        format.json { render :json => @context_module_group.to_json(:include => :context_module_group_associations, :permissions => {:user => @current_user, :session => session}) }
      else
        format.json { render :json => @context_module_group.errors.to_json, :status => :bad_request }
      end
    end
  end

  def update
    @context_module_group = ContextModuleGroup.find(params[:id].to_i)
      if  @context_module_group.update_attributes(params[:context_module_group])
        redirect_to permission_groups_course_context_modules_url(@context)
      end
  end

  def destroy
    @context_module_group = ContextModuleGroup.find(params[:id].to_i)
    respond_to do |format|
      if  @context_module_group.destroy
        format.json { render :json => @context_module_group}
      else
        format.json { render :json => @context_module_group.errors.to_json, :status => :bad_request }
      end
    end
  end

  def reorder
    if authorized_action(@context.context_modules.new, @current_user, :update)
      mg = @context.context_module_groups.not_deleted.first

      mg.update_order(params[:order].split(","))
      # Need to invalidate the ordering cache used by context_module.rb
      @context.touch

      respond_to do |format|
        format.json { render :json => @module_groups.to_json}
      end
    end
  end



end
