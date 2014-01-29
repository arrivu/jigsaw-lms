class CommentsController < ApplicationController
  before_filter :require_context
  add_crumb(proc { t '#crumbs.comments', "Comments" }, :except => [:new,:destroy]) { |c| c.send :course_comments_path, c.instance_variable_get("@context") }
  before_filter { |c| c.active_tab = "Comments" }

  def create
    @comment = @context.comments.build(params[:comment])
    @comment.user_id = @current_user.id
    respond_to do |format|
      if @comment.save
        format.html { redirect_to course_comments_path(@context.id) }
        flash[:info] = "Your review is added "
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
        format.html { redirect_to course_comments_path(@context.id) }
      end
    end
  end


  def index
    @comments = @context.comments.recent.paginate(:page => params[:page], :per_page => 50)
    @comment = Comment.find_by_user_id_and_commentable_id_and_commentable_type(@current_user.id,@context.id,@context.class.name)
    @comment ||= Comment.new
  end


end
