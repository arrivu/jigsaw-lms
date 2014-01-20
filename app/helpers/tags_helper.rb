module TagsHelper

  def tag_tokens(query)
    tags = ActsAsTaggableOn::Tag.named_like(params[:q],@domain_root_account.id)
    if tags.empty?
      [{id: "<<<#{query}>>>", name: "New: \"#{query.strip.gsub(' ', '-')}\""}]
    else
      tags.map(&:attributes)
    end
  end

  def tag_list(tag_tokens, taggable, tagger)
    tags_list= tag_tokens.gsub!(/<<<(.+?)>>>/) { ActsAsTaggableOn::Tag.find_or_create_by_name_and_account_id(name: $1.strip.gsub(' ', '-'),
                                                                             account_id: @domain_root_account.id).id }
    if tags_list.nil?
      delete_tags(taggable,tag_tokens)
      tag_tokens.split(",").map do |n|
        ActsAsTaggableOn::Tagging.find_or_create_by_tag_id_and_taggable_id_and_taggable_type_and_context(tag_id: n.to_i,
                                                taggable_id: taggable.id, taggable_type: taggable.class.name,
                                                context: "tags",tagger_id: tagger.id,tagger_type: tagger.class.name)
      end
    else
      tags_list.split(",").map do |n|
        ActsAsTaggableOn::Tagging.find_or_create_by_tag_id_and_taggable_id_and_taggable_type_and_context(tag_id: n.to_i,
                                                  taggable_id: taggable.id, taggable_type: taggable.class.name,
                                                  context: "tags",tagger_id: tagger.id,tagger_type: tagger.class.name)
      end
    end

  end

  def delete_tags(taggable,tag_tokens)
    tag_id_arr = Array.new
    taggable.tags.each do |tag|
      tag_id_arr  << tag.id.to_s
    end
    tag_array =tag_tokens.split(",")
    deleted_tag=  tag_id_arr - tag_array
    unless deleted_tag.nil?
      deleted_tag.each do |tag_id|
        taggable.taggings.find_by_tag_id(tag_id).destroy
      end
    end
  end


end


