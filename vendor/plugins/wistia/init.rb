Canvas.reloadable_plugin(File.dirname(__FILE__))

Rails.configuration.to_prepare do
  WistiaApi.register_plugin()
end
