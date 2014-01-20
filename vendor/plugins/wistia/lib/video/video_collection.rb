module VideoCollection

  class Collection
  attr_accessor :id, :hash_id, :name, :description, :mediaCount

  def initialize(id, hash_id, name, description, mediaCount)
    @id = id
    @hash_id = hash_id
    @name    = name
    @description = description
    @mediaCount = mediaCount
  end

  end

  class Media
    attr_accessor  :id, :hash_id, :name,:description,:embed_code ,:thumbnail_url,:thumbnail_height,:thumbnail_width

    def initialize(id, hash_id, name, description, embed_code,
        thumbnail_url, thumbnail_height, thumbnail_width)
      @id = id
      @hash_id = hash_id
      @name    = name
      @description = description
      @embed_code = embed_code
      @thumbnail_url =   thumbnail_url
      @thumbnail_height =   thumbnail_height
      @thumbnail_width =   thumbnail_width
    end
  end

  end


