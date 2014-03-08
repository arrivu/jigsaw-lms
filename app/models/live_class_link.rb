class LiveClassLink < ActiveRecord::Base
  include SearchTermHelper

  belongs_to :context_module
  belongs_to :course_section
  belongs_to :course

  attr_accessible :name, :link_url,:course_section_id, :context_module_id

  validates_presence_of :name, :link_url

  validates_format_of :link_url, :with => URI::regexp(%w(http https))

  def tool_pagination_url
    if @context.is_a? Course
      api_v1_course_external_tools_url(@context)
    else
      api_v1_account_external_tools_url(@context)
    end
  end

end
