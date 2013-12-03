ActionController::Dispatcher.middleware.use OmniAuth::Builder  do

  provider :facebook, "555321834555667", "1a13870e08753770471dc06ab362f462"
  provider :linkedin, "755v9o4po1nv69", "3tcFcLEf18g5YyyK"
  provider :google_oauth2, "836287453511.apps.googleusercontent.com", "CHE7ouYKPAw7Txm9MZw6ZEKA"

end
