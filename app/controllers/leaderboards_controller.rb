class LeaderboardsController < ApplicationController
  before_filter :require_user
  before_filter :require_context


  def index
    if authorized_action(@context, @current_user, :read)
      add_crumb("Leader Board")
      can_manage_students = @context.grants_right?(@current_user, session, :manage_students)
      course_sections = @context.sections_visible_to(@current_user)
      if params[:search_term]
        if params[:course_section_id].empty? or (params[:course_section_id].to_i == 0)
          @students = @context.students.active.order_by_sortable_name
        else
          @students = @context.course_sections.active.find(params[:course_section_id]).students.active
        end
      else
        if can_manage_students
          @students = @context.students.active.order_by_sortable_name
        else
          @students = []
          course_sections.each do |course_section|
            @context.course_sections.active.find(course_section.id).students.active.each do |student|
              @students << student
            end
          end
        end
      end

      js_env(
          course_sections: course_sections.active.map(&:attributes),
          course: @context.attributes,
          :manage_students => can_manage_students
      )
      respond_to do |format|
        @students = Api.paginate(@students, self, course_leaderboards_url)
        format.html
        format.json {
          render :json => users_json(@students, @current_user, session, %w{avatar_url user_progression get_badges},
                                    @current_user.pseudonym.account) }
      end
    end
  end


end
