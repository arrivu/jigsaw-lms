require "#{Rails.root}/vendor/plugins/wistia/lib/wistia/wistia_video_api"
VideosController.class_eval do
  alias :list_collections_original :list_collections
  alias :get_collection_original :get_collection

  def  list_collections
    if WistiaVideoAPI.enabled?
      WistiaVideoAPI.list_collections
    else
      list_collections_original
    end
  end

  def get_collection
    if WistiaVideoAPI.enabled?
      WistiaVideoAPI.get_collection(params[:collection_id])
    else
      get_collection_original
    end
  end

end
