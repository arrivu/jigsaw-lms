class UserModuleGroupEnrollmentsController < ApplicationController
  before_filter :require_user
  before_filter :require_context
  add_crumb(proc { t('#crumbs.classes', "Classes") }) { |c| c.send :named_context_url, c.instance_variable_get("@context"), :context_context_modules_url }
  def index
    if authorized_action(@context, @current_user, :read)
      @context_module_group = ContextModuleGroup.find_by_context_id_and_context_type_and_is_default(@context.id,@context.class.name,true)
      if @context_module_group.try(:is_default)
        create_default_permission(@context_module_group)
      end
      add_crumb(t('#crumbs.permissions', "Permissions"), course_user_module_group_enrollments_url(@context))
      @context_module_groups = @context.context_module_groups.active
      js_env :COURSE_MODULE_GROUPS_FOR_ENROLLMENT => @context_module_groups.map(&:attributes)
      js_env :ENROLLED_COURSE_USERS => @context.students.active.map(&:attributes)
      js_env :COURSE_ID => @context.id
      # { 1:  [2,3,4]}
      # module_group_id: user_id array of user ids
      @module_group_user_ids = {}
      user_ids = []
      @context_module_groups.each do |context_module_group|
        module_group_id = context_module_group.id
        @user_module_group_enrollments = UserModuleGroupEnrollment.where(context_module_group_id: module_group_id ,workflow_state: UserModuleGroupEnrollment::ACTIVE)
        @user_module_group_enrollments.each do |user_module_group_enrollment|
          user_ids << user_module_group_enrollment.user_id
        end
        @module_group_user_id = {module_group_id.to_i => user_ids}
        user_ids = []
        @module_group_user_ids.merge!(@module_group_user_id)
      end
      js_env :MODULE_GROUP_PERMISSION_USER_IDS => @module_group_user_ids
    end
  end


  def update
    if authorized_action(@context.context_modules.new, @current_user, :update)
      @user_module_group_enrollment = UserModuleGroupEnrollment.find_or_create_by_user_id_and_context_module_group_id(params[:user_id],params[:module_id])
      respond_to do |format|
        format.json {
          if params[:status] == UserModuleGroupEnrollment::ACTIVE
            @user_module_group_enrollment.workflow_state = UserModuleGroupEnrollment::ACTIVE
            @user_module_group_enrollment.save!
            render :json => @user_module_group_enrollment
          else
            @user_module_group_enrollment.workflow_state = UserModuleGroupEnrollment::DELETED
            @user_module_group_enrollment.save!
            render :json => @user_module_group_enrollment
          end
        }
        end
    end
  end

  def permission_groups
    if authorized_action(@context, @current_user, :read)
      add_crumb(t('#crumbs.permissions', "Permission groups"), permission_groups_course_context_modules_url(@context))
      @modules = @context.modules_visible_to(@current_user)
      @module_groups = @context.context_module_groups

      @collapsed_modules = ContextModuleProgression.for_user(@current_user).for_modules(@modules).select([:context_module_id, :collapsed]).select{|p| p.collapsed? }.map(&:context_module_id)
      if @context.grants_right?(@current_user, session, :participate_as_student)
        return unless tab_enabled?(@context.class::TAB_MODULES)
        ContextModule.send(:preload_associations, @modules, [:content_tags])
        @modules.each{|m| m.evaluate_for(@current_user) }
        session[:module_progressions_initialized] = true
      end
    end
  end

  def create_default_permission(context_module_group)
      if context_module_group
        @context.students.active.each do |student|
          UserModuleGroupEnrollment.find_or_create_by_user_id_and_context_module_group_id(student.id,context_module_group.id,workflow_state: UserModuleGroupEnrollment::ACTIVE)
        end
      end
  end

end
