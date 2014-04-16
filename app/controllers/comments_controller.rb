class CommentsController < ApplicationController
  before_filter :require_context
  add_crumb(proc { t '#crumbs.testimonial', "Testimonial" }, :except => [:new,:destroy]) { |c| c.send :course_comments_path, c.instance_variable_get("@context") }
  before_filter { |c| c.active_tab = "Comments" }

  def create
    @comment = @context.comments.build(params[:comment])
    @comment.user_id = @current_user.id
    respond_to do |format|
      if @comment.save
        format.html { redirect_to course_comments_path(@context.id) }
        if can_do(@context, @current_user, :update)
          @comment.is_approved = true
          @comment.save
          flash[:info] = "Your review is added "
        else
          flash[:info] = "Your review is waiting for approval"
        end
      else
       redirect_to :back
      end
    end
  end

  def destroy
     @comment = Comment.find(params[:id])
     @comment.destroy
     #flash[:success] = "Successfully Destroyed Category."
     flash[:notice] = t(:deleted_comments, "Successfully deleted")
     redirect_to :back
  end


 def update
    @comment = Comment.find(params[:id])
    respond_to do |format|
      if @comment.update_attributes(params[:comment])
        if can_do(@context, @current_user, :update)
          @comment.is_approved = true
          flash[:notice] = "Your review is updated"
        else
          @comment.is_approved = false
          flash[:notice] = "Your review is waiting for approval"
        end
        @comment.save
        format.html { redirect_to course_comments_path(@context.id) }
      end
    end
  end


  def index
    if can_do(@context, @current_user, :update)
      @comments = @context.comments.recent.paginate(:page => params[:page], :per_page => 50)
    else
      @comments = @context.comments.approved.recent.paginate(:page => params[:page], :per_page => 50)
    end
    @comment = Comment.find_by_user_id_and_commentable_id_and_commentable_type(@current_user.id,@context.id,@context.class.name)
    @comment ||= Comment.new
  end

  def comment_approve
    if authorized_action(@context, @current_user, :update)
      @comment = Comment.find(params[:id])
      @comment.is_approved = params[:approval_status]
      @comment.save!
      render :json => @comment.to_json
    end
  end


end
