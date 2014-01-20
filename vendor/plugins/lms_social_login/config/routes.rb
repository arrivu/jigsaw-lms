FakeRails3Routes.draw do
  resources :omniauth_links
  match '/auth/:provider/callback' => 'authentication#create'
end