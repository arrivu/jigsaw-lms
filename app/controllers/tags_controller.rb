class TagsController < ApplicationController
  include TagsHelper



  def discussion_topic_tags
    respond_to do |format|
      format.html
      format.json { render json: tag_tokens(params[:q]) }
    end
  end
end
