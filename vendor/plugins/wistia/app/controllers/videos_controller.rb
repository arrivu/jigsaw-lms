require "#{Rails.root}/vendor/plugins/wistia/lib/wistia/wistia_video_api"
class VideosController < ApplicationController
  before_filter :require_user

  def  list_collections
    if WistiaVideoAPI.enabled?
       WistiaVideoAPI.list_collections

       respond_to do |format|
         format.json  { render :json => {:collections => WistiaVideoAPI.instance_variable_get(:@collections) }}
       end
    end
  end

  def get_collection
    if WistiaVideoAPI.enabled?
      WistiaVideoAPI.get_medias(params[:collection_id])
      respond_to do |format|
        format.json  { render :json => {:collections => WistiaVideoAPI.instance_variable_get(:@collection),
                                        :medias => WistiaVideoAPI.instance_variable_get(:@medias) }}
      end
    end
  end

end
