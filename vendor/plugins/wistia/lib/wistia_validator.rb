module Canvas::Plugins::Validators::WistiaValidator
  def self.validate(settings, plugin_setting)
    if settings.map(&:last).all?(&:blank?)
      {}
    else
      if settings.map(&:last).any?(&:blank?)
        plugin_setting.errors.add_to_base(I18n.t('canvas.plugins.errors.all_fields_required', 'All fields are required'))
        false
      else
        res = WistiaVideoAPI.config_check(settings)
        if res
          plugin_setting.errors.add_to_base(res)
          false
        else
          settings.slice(:secret_password, :cache_timeout)
        end
      end
    end
  end
end