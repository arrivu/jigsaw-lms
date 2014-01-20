require 'wistia'

class WistiaVideoAPI
  require 'net/http'
  require 'net/https'
  require 'uri'
  require  'video/video_collection'
  def self.config_check(settings)
    username = settings['username']
    secret_password = settings['secret_password']
    public_token = settings['public_token']
    cache_timeout = settings['cache_timeout']
    self.authenticate(secret_password)
  end

  def self.config
    #Canvas::Plugin.find(:wistia).try(:settings)
    config_check( Canvas::Plugin.find(:wistia).try(:settings))
  end

  def self.enabled?
    !!config
  end

  def self.list_collections
    @collections =[]
    begin
      projects = Wistia::Project.find(:all)
      @collections = []
      projects.each do  |project|
        collection_from_project(project)
        @collections << @collection
      end
      @collections

      rescue => e
        return "Error #{e.message}"
    end
  end

  def self.get_medias(collection_id)
    @collection =[]
    @medias =[]
    begin
    @collection = Wistia::Project.get(collection_id)

      if project['medias']
        project['medias'].each do  |media|
          @medias << media_from_wistia_project(media)
        end
      end

    @medias
    end
  rescue => e
    return "Error #{e.message}"
  end

  def self.authenticate(secret_password)
    begin
      Wistia.use_config!(:wistia => {
          :api => {
              :password => secret_password,
              :format => 'json'
          }
      })
      #test to list all the projects
      #load_collections
    rescue => e
      return "Wistia Video API Configuration check failed, please check your settings #{e.message}"
    end
    #self.authenticate=true
  end

  def self.collection_from_project(project)
    @collection = VideoCollection::Collection.new(project.id, project.hashedId, project.name, project.description, project.mediaCount)
  end

  def self.media_from_wistia_project(media)
   VideoCollection::Media.new(media['id'], media['hashed_id'], media['name'], media['description'], media['embed_code'],
                                       media['thumbnail']['url'], media['thumbnail']['height'], media['thumbnail']['width'])
  end
end
