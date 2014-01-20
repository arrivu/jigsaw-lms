module WistiaApi
  def self.register_plugin
    Canvas::Plugin.register('wistia', nil, {
        :name => lambda{ t :name, 'Wistia' },
        :description => lambda{ t :description, 'Wistia Video platform '},
        :website => 'http://www.wistia.com/',
        :author => 'Arrivu Infotech',
        :author_website => 'http://www.arrivuapps.com',
        :version => '1.0.0',
        :settings_partial => 'plugins/wistia_settings',
        :settings => {:api_url => 'http://wistia.com/doc/developers/'}
    })
  end
end