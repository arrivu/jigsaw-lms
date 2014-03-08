class LiveClassLinksController < ApplicationController
  before_filter :require_context
  before_filter :require_user


  def index
    if authorized_action(@context, @current_user, :manage_content)
      add_crumb("Live Class Links", course_live_class_links_url(@context))
      @live_class_links = @context.live_class_links
      if params[:search_term]
        if params[:course_section_id].empty? and params[:context_module_id].empty?
          @live_class_links = @context.live_class_links
        elsif params[:context_module_id].empty?
          @live_class_links = @context.live_class_links
        elsif params[:course_section_id].empty?
          @live_class_links = @context.live_class_links.find_all_by_context_module_id(params[:context_module_id])
        else
          @live_class_links = @context.live_class_links.find_all_by_context_module_id_and_course_section_id(params[:context_module_id],params[:course_section_id])
        end
      end
      js_env(
          course_sections: @context.course_sections.active.map(&:attributes),
          course_modules: @context.context_modules.active.map(&:attributes)
      )
      respond_to do |format|
        @live_class_links = Api.paginate(@live_class_links, self, course_live_class_links_url)
        format.html
        format.json {render :json => @live_class_links.map(&:attributes)}
      end
    end
  end

  def create
    if authorized_action(@context, @current_user, :manage_content)
      @live_class_link = @context.live_class_links.build(name: params[:name],link_url: params[:link_url],
                                                        course_section_id: params[:course_section_id],
                                                        context_module_id: params[:module_id] )

      respond_to do |format|
       if @live_class_link.save
          format.json {render :json => @live_class_link.attributes}
       else
         format.json {render :json => @live_class_link.errors ,:status => :bad_request}
       end
      end
    end
  end

  def update
    if authorized_action(@context, @current_user, :manage_content)
      @live_class_link = LiveClassLink.find(params[:id])
      respond_to do |format|
        @live_class_link.update_attributes(name: params[:name],link_url: params[:link_url],
                                           course_section_id: params[:course_section_id],
                                           context_module_id: params[:module_id] )
       if @live_class_link.save
        format.json {render :json => @live_class_link.attributes}
       else
         format.json {render :json => @live_class_link.errors ,:status => :bad_request}
        end
      end
    end
  end

  def destroy
    if authorized_action(@context, @current_user, :manage_content)
      @live_class_link = LiveClassLink.find(params[:id])
      respond_to do |format|
        if  @live_class_link.destroy
          format.json {render :json => @live_class_link}
        else
          format.json {render :json => @live_class_link ,:status => :bad_request}
        end
        end
    end
  end

end
